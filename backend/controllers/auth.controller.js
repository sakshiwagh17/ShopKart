const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const redis = require("../lib/redis.js");

// Generate access and refresh tokens
const generateToken = (userId) => {
  const accesstoken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshtoken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accesstoken, refreshtoken };
};

// Store refresh token in Redis
const storeRefreshToken = async (userId, refreshtoken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshtoken,
    "EX",
    7 * 24 * 60 * 60
  ); // 7 days
};

// Set secure cookies
const setCookie = (res, accesstoken, refreshtoken) => {
  res.cookie("accesstoken", accesstoken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshtoken", refreshtoken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// Signup controller
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    const { accesstoken, refreshtoken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshtoken);
    setCookie(res, accesstoken, refreshtoken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.comparePassword(password))) {
      const { accesstoken, refreshtoken } = generateToken(user._id);
      await storeRefreshToken(user._id, refreshtoken);
      setCookie(res, accesstoken, refreshtoken);

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password!" });
    }
  } catch (error) {
    console.log("Error in login:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout controller
const logout = async (req, res) => {
  try {
    const refreshtoken = req.cookies.refreshtoken;
    if (refreshtoken) {
      const decoded = jwt.verify(
        refreshtoken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");
    res.json({ message: "Logout successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Refresh token controller
const refreshToken = async (req, res) => {
  try {
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken) {
      return res.status(401).json({ message: "No refresh token provided!" });
    }

    const decoded = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET);

    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
    if (!storedToken || storedToken !== refreshtoken) {
      return res.status(403).json({ message: "Invalid refresh token!" });
    }

    const { accesstoken, refreshtoken: newRefreshtoken } = generateToken(
      decoded.userId
    );
    await storeRefreshToken(decoded.userId, newRefreshtoken);
    setCookie(res, accesstoken, newRefreshtoken);

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired refresh token",
      error: error.message,
    });
  }
};

module.exports = { signup, login, logout, refreshToken };

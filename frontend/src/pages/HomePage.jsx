import React from 'react'
import CategoryItem from '../components/CategoryItem'

const HomePage = () => {
  const categories = [
    { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
    { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
    { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
    { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
    { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
    { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
    { href: "/tshirts", name: "Tshirts", imageUrl: "/tshirts.jpg" },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen ">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text mb-4">
          Explore Our Categories
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Discover the latest trends in eco-friendly fashion and elevate your style with our curated selection.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {categories.map(category => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

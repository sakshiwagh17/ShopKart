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
]

 
  return (
    <div className='relative overflow-hidden min-h-screen'>
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <h2 className='text-center text-4xl sm:text-5xl font-bold text-indigo-600 mb-4'>
          Explore Our Categories
        </h2>
        <p className='text-center text-indigo-400 mb-12'>
          Discover the latest trends in eco-friendly fashion and elevate your style with our curated selection.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8'>
          {categories.map(category => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage

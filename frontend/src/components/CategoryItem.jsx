import React from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({ category }) => {
  return (
    <div className='relative overflow-hidden h-96 w-full rounded-lg group'>
    <Link to={"/category" + category.href}>
      <div className="relative overflow-hidden rounded-2xl shadow-lg border-gray-800 border-10 shadow-slate-800 group hover:shadow-xl transition duration-300">
        <img
          src={category.imageUrl}
          alt={category.name}
          loading="lazy"
          className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xl font-semibold text-center py-3">
          {category.name}
        </div>
      </div>
    </Link>
    </div>
  )
}

export default CategoryItem

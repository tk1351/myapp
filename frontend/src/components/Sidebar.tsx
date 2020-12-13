import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '../features/categorySlice'

export interface Category {
  _id: string
  name: string
} 

const Sidebar: React.FC = () => {
  const categories = useSelector(selectAllCategories)

  return (
    <>
     {categories.map((category: Category) => (
       <li key={category._id}>
         {category.name}
       </li>
     ))}
    </>
  )
}

export default Sidebar


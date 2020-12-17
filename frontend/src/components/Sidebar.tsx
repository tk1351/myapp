import React from 'react'
import { Link, Router } from 'react-router-dom'
import history from '../history'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '../features/categorySlice'

export interface Category {
  _id: string
  name: string
} 

const Sidebar: React.FC = () => {
  const categories = useSelector(selectAllCategories)

  return (
    <Router history={history}>
     {categories.map((category: Category) => (
       <li key={category._id}>
         <Link to={`/category/${category._id}`}>{category.name}</Link>
       </li>
     ))}
    </Router>
  )
}

export default Sidebar


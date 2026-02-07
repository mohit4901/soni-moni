import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { useLocation } from 'react-router-dom'

const Collection = () => {

  const { products } = useContext(ShopContext)
  const location = useLocation()

  const [subCategory, setSubCategory] = useState([])
  const [filterProducts, setFilterProducts] = useState([])

  /* 🔥 URL SE SUBCATEGORY READ */
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlSubCategory = params.get('subCategory')

    if (urlSubCategory) {
      setSubCategory([urlSubCategory])
    }
  }, [location.search])

  /* 🔥 FILTER */
  useEffect(() => {
    if (subCategory.length === 0) {
      setFilterProducts(products)
    } else {
      setFilterProducts(
        products.filter(item =>
          subCategory.includes(item.subCategory)
        )
      )
    }
  }, [subCategory, products])

  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(i => i !== value)
        : [...prev, value]
    )
  }

  return (
    <div className="flex gap-10 pt-10 border-t">

      {/* FILTER */}
      <div className="min-w-60">
        <p className="text-xl mb-4">TYPE</p>

        {['Burberry','Cotton','Organza','Silk','Georgette','Linen'].map(sub => (
          <label key={sub} className="flex gap-2 text-sm">
            <input
              type="checkbox"
              value={sub}
              checked={subCategory.includes(sub)}
              onChange={toggleSubCategory}
            />
            {sub}
          </label>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
        {filterProducts.map(item => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>

    </div>
  )
}

export default Collection

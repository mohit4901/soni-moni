import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { useLocation } from 'react-router-dom'

const PRODUCTS_PER_PAGE = 20

const Collection = () => {

  const {
    products = [],
    loading,
    search,
    showSearch,
    setSubCategory: setGlobalSubCategory
  } = useContext(ShopContext)

  const location = useLocation()

  const [showFilter, setShowFilter] = useState(false)
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')
  const [currentPage, setCurrentPage] = useState(1)

  // URL → Context Sync
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlSubCategory = params.get('subCategory')

    if (urlSubCategory) {
      setSubCategory([urlSubCategory])
      setGlobalSubCategory(urlSubCategory)
    }
  }, [location.search])

  const toggleCategory = (e) => {
    setCurrentPage(1)
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const toggleSubCategory = (e) => {
    setCurrentPage(1)
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  // 🔥 DERIVED FILTERED PRODUCTS (NO STATE SYNC BUG)
  const filteredProducts = useMemo(() => {

    let result = [...products]

    if (showSearch && search) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      result = result.filter(item =>
        category.includes(item.category)
      )
    }

    if (subCategory.length > 0) {
      result = result.filter(item =>
        subCategory.includes(item.subCategory)
      )
    }

    if (sortType === 'low-high') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      result.sort((a, b) => b.price - a.price)
    }

    return result

  }, [products, category, subCategory, search, showSearch, sortType])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* FILTER SECTION */}
      <div className="min-w-60">

        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Office Wear', 'Daily Wear', 'Festival Wear', 'Bridal Wear', 'Suit', 'Kurti'].map(cat => (
              <label key={cat} className="flex gap-2 capitalize">
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Burberry', 'Cotton', 'Organza', 'Silk', 'Georgette', 'Linen'].map(sub => (
              <label key={sub} className="flex gap-2 capitalize">
                <input
                  className="w-3"
                  type="checkbox"
                  value={sub}
                  checked={subCategory.includes(sub)}
                  onChange={toggleSubCategory}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="flex-1">

        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">

          {loading ? (
            <p className="col-span-full text-center py-20 text-gray-500">
              Loading products...
            </p>
          ) : paginatedProducts.length === 0 ? (
            <p className="col-span-full text-center py-20 text-gray-500">
              No products found.
            </p>
          ) : (
            paginatedProducts.map(item => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          )}

        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10 flex-wrap">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentPage(i + 1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className={`px-4 py-2 rounded-full text-sm ${
                  currentPage === i + 1
                    ? 'bg-[#9f3b00] text-white'
                    : 'border border-[#9f3b00] text-[#9f3b00]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Collection

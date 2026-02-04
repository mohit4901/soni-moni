import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <div className="flex-shrink-0 w-[78vw] sm:w-full">
      <Link
        to={`/product/${id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="block h-full"
      >
        {/* CARD */}
        <div className="bg-white rounded-[28px] p-4 shadow-md h-full flex flex-col">

          {/* IMAGE AREA (FIXED HEIGHT) */}
          <div className="relative bg-[#f5f5f5] rounded-[20px] h-[230px] flex items-center justify-center">

            {/* Wishlist */}
            <button
              type="button"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"
            >
              <Heart size={16} className="text-[#9f3b00] fill-[#9f3b00]" />
            </button>

            {/* Product Image */}
            <img
              src={image[0]}
              alt={name}
              className="max-h-[170px] max-w-[85%] object-contain"
            />
          </div>

          {/* CONTENT */}
          <div className="mt-4 flex flex-col flex-1">

            {/* Title + Rating */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                {name}
              </h3>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                ★ <span>4.5</span>
              </div>
            </div>

            {/* Description (optional static like reference) */}
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              Premium handcrafted collection with elegant detailing.
            </p>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* PRICE + BUTTON */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-semibold">
                {currency}{price}
              </p>

              <button
                type="button"
                className="
                  px-5 py-2
                  rounded-full
                  border
                  border-[#9f3b00]
                  text-sm
                  font-medium
                  text-[#9f3b00]
                  hover:bg-[#9f3b00]
                  hover:text-white
                  transition
                "
              >
                Add to cart
              </button>
            </div>

          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductItem

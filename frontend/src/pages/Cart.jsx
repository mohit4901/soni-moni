import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const itemData = cartItems[productId][size]

          // ✅ Handle new object structure safely
          const quantity =
            typeof itemData === 'number' ? itemData : itemData.quantity

          const instruction =
            typeof itemData === 'object' ? itemData.instruction || '' : ''

          if (quantity > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity,
              instruction,
            })
          }
        }
      }

      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          )

          if (!productData) return null

          return (
            <div
              key={index}
              className="
                py-4 border-t border-b text-gray-700
                grid grid-cols-[4fr_0.7fr_0.5fr]
                sm:grid-cols-[4fr_2fr_0.5fr]
                items-center gap-4
              "
            >
              {/* LEFT SIDE */}
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20 object-contain"
                  src={productData?.image?.[0] || '/placeholder.png'}
                  alt={productData.name}
                />

                <div className="w-full">
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>

                  <div className="flex items-center gap-5 mt-2 text-sm sm:text-base">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>

                  {/* ✅ NEW: INSTRUCTION INPUT */}
                  <input
                    type="text"
                    placeholder="Enter preferred color (e.g. Black, Red...)"
                    value={item.instruction || ''}
                    onChange={(e) =>
                      updateQuantity(
                        item._id,
                        item.size,
                        item.quantity,
                        e.target.value // 👈 instruction
                      )
                    }
                    className="mt-3 border px-2 py-1 w-full text-xs sm:text-sm rounded outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* QUANTITY */}
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => {
                  const val = e.target.value
                  if (val === '' || val === '0') return

                  updateQuantity(
                    item._id,
                    item.size,
                    Number(val),
                    item.instruction
                  )
                }}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              />

              {/* DELETE */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="remove"
              />
            </div>
          )
        })}
      </div>

      {/* TOTAL + CHECKOUT */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-800 transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

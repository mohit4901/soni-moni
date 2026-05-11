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
    <div className="border-t pt-14 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="text-2xl mb-6">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className="space-y-6">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          )

          if (!productData) return null

          return (
            <div key={index} className="py-6 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group">
              <div className="flex gap-6 w-full sm:w-auto">
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                  <img
                    className="w-24 h-32 sm:w-28 sm:h-36 object-cover transition-transform duration-500 group-hover:scale-110"
                    src={productData?.image?.[0]}
                    alt={productData.name}
                  />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-lg font-medium text-gray-800">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className="text-gray-600 font-semibold">{currency}{productData.price}</p>
                      <p className="px-2 sm:px-3 py-1 border bg-slate-50 text-sm rounded">Size: {item.size}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">Preferred Color</label>
                    <div className="mt-1 relative max-w-[200px]">
                      <input
                        type="text"
                        placeholder="e.g. Royal Blue"
                        defaultValue={item.instruction || ''}
                        onBlur={(e) =>
                          updateQuantity(
                            item._id,
                            item.size,
                            item.quantity,
                            e.target.value
                          )
                        }
                        className="w-full border-b border-gray-300 focus:border-black outline-none py-1 transition-colors text-sm bg-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-8 sm:gap-12">
                {/* QUANTITY CONTROL */}
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1, item.instruction)}
                    className="px-3 py-1 hover:bg-gray-100 transition-colors text-lg"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 font-medium border-x border-gray-300 min-w-[40px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1, item.instruction)}
                    className="px-3 py-1 hover:bg-gray-100 transition-colors text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => updateQuantity(item._id, item.size, 0, item.instruction)}
                  className="p-2 hover:bg-red-50 rounded-full transition-colors group/delete"
                >
                  <img className="w-5 opacity-50 group-hover/delete:opacity-100" src={assets.bin_icon} alt="Remove" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {cartData.length > 0 ? (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate('/place-order')}
                className="bg-black text-white text-sm my-8 px-8 py-3 rounded-sm active:bg-gray-700 transition-colors uppercase tracking-widest"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-gray-400 text-xl">Your cart is empty</p>
          <button
            onClick={() => navigate('/collection')}
            className="mt-6 border border-black px-8 py-3 hover:bg-black hover:text-white transition-all uppercase text-sm tracking-widest"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart

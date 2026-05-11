import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const ORDER_STEPS = [
  'Order Placed',
  'Packing',
  'Shipped',
  'Out for delivery',
  'Delivered'
]

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const [openTracker, setOpenTracker] = useState(null)

  const loadOrderData = async () => {
    try {
      if (!token) return

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id
            })
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  const getStepIndex = (status) =>
    ORDER_STEPS.indexOf(status)

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => {
          const currentStep = getStepIndex(item.status)

          return (
            <div
              key={index}
              className='py-4 border-b text-gray-700 flex flex-col gap-4'
            >

              {/* ORDER BASIC INFO */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex gap-6 text-sm'>
                  <img
                    className='w-16 sm:w-20'
                    src={item.image[0]}
                    alt=""
                  />
                  <div>
                    <p className='font-medium'>{item.name}</p>
                    <p className='mt-1'>
                      {currency}{item.price} × {item.quantity}
                    </p>
                    <p className='mt-1 text-gray-400'>
                      Size: {item.size || 'Free'}
                    </p>
                    <p className='mt-1 text-gray-400'>
                      {new Date(item.date).toDateString()}
                    </p>
                    <p className='mt-1 text-gray-400'>
                      Payment: {item.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* STATUS + BUTTON */}
                <div className='flex items-center justify-between md:w-1/2'>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 rounded-full bg-green-500'></span>
                    <p className='text-sm font-medium'>{item.status}</p>
                  </div>

                  <button
                    onClick={() =>
                      setOpenTracker(
                        openTracker === index ? null : index
                      )
                    }
                    className='border px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition'
                  >
                    Track Order
                  </button>
                </div>
              </div>

              {/* 🔽 TRACKING PANEL */}
              {openTracker === index && (
                <div className='mt-4 bg-gray-50 rounded-lg p-4'>
                  <div className='flex flex-col sm:flex-row sm:justify-between gap-4'>
                    {ORDER_STEPS.map((step, i) => (
                      <div
                        key={i}
                        className='flex sm:flex-col items-center gap-2 sm:flex-1'
                      >
                        <div
                          className={`
                            w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold
                            ${i <= currentStep
                              ? 'bg-[#9f3b00] text-white'
                              : 'bg-gray-300 text-gray-600'
                            }
                          `}
                        >
                          {i + 1}
                        </div>
                        <p
                          className={`
                            text-xs sm:text-sm text-center
                            ${i <= currentStep
                              ? 'text-[#9f3b00] font-medium'
                              : 'text-gray-400'
                            }
                          `}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Orders

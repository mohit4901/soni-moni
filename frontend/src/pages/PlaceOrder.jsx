import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('razorpay');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        backendUrl + '/api/order/verifyRazorpay',
                        response,
                        { headers: { token } }
                    )
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {

                    const itemData = cartItems[items][item]

                    const quantity =
                        typeof itemData === "number" ? itemData : itemData.quantity

                    const instruction =
                        typeof itemData === "object" ? itemData.instruction : ""

                    if (quantity > 0) {

                        const product = products.find(p => p._id === items)

                        if (product) {
                            orderItems.push({
                                productId: product._id,   // ✅ FIXED
                                name: product.name,
                                price: product.price,
                                size: item,
                                quantity: quantity,
                                instruction: instruction,
                                image: product.image // ✅ ADDED
                            })
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            if (method === 'razorpay') {
                const responseRazorpay = await axios.post(
                    backendUrl + '/api/order/razorpay',
                    orderData,
                    { headers: { token } }
                )

                if (responseRazorpay.data.success) {
                    initPay(responseRazorpay.data.order)
                } else {
                    toast.error("Payment failed")
                }
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

            {/* LEFT */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border px-3 py-1.5 w-full' placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border px-3 py-1.5 w-full' placeholder='Last name' />
                </div>

                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border px-3 py-1.5 w-full' placeholder='Email' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border px-3 py-1.5 w-full' placeholder='Street' />

                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border px-3 py-1.5 w-full' placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border px-3 py-1.5 w-full' placeholder='State' />
                </div>

                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border px-3 py-1.5 w-full' placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border px-3 py-1.5 w-full' placeholder='Country' />
                </div>

                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border px-3 py-1.5 w-full' placeholder='Phone' />
            </div>

            {/* RIGHT */}
            <div className='mt-8'>

                <CartTotal />

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 cursor-pointer'>
                        <p className={`w-3 h-3 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                        <img className='h-5' src={assets.razorpay_logo} alt="" />
                    </div>

                    <button type='submit' className='bg-black text-white px-16 py-3 mt-6'>
                        PLACE ORDER
                    </button>
                </div>
            </div>

        </form>
    )
}

export default PlaceOrder

import React, { useState, useContext } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const [method, setmethod] = useState('cod')
  const { navigate, backendUrl, token, cartItems, setcartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

  // order controller ke liye form data to save delivery info
  const [formData, setformData] = useState({
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
  // to save formdata i.e delivery info
  const onchangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setformData(data => ({ ...data, [name]: value }))
  }

  const onsubmitHandler = async (event) => {
    event.preventDefault()
    try {
      // making an array of objects to store info about items being ordered 
      let orderItems = []
      for (const items in cartItems) {
        for(const sizess in cartItems[items]){

          if(cartItems[items][sizess]>0){

            const iteminfo = structuredClone(products.find(products => products._id === items))

            if(iteminfo){
              iteminfo.size = sizess
              iteminfo.quantity = cartItems[items][sizess]
              orderItems.push(iteminfo)
            }
          }
        }
      }

      // to place the order creating orderdata for sending to  backend
      let orderData = {
        address:formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }
      

      // to choose payment method
      switch(method){

        // API call for COD
        case 'cod':
          const response = await axios.post(backendUrl +'/api/order/place',orderData,{headers:{token}})

          if(response.data.success){
    
            
            setcartItems({}) // empty cart after placing the order
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
            
          }
          break;
        
        // API call for stripe payment gateway integration
        case 'stripe':

          const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})

          if(responseStripe.data.success){ //if the session is created succesfully --we will get the session url
            const {session_url} = responseStripe.data

            window.location.replace(session_url) //redirecting user to the payment gateway using session url

          }else{
            toast.error(responseStripe.data.message)
          }


          break;  

        default:
            break;
      }
      

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      

    }
  }


  return (
    <form onSubmit={onsubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* ----------- Left Side ----------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        {/* Making controlled input fields for Order Data */}

        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required onChange={onchangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>

        <input required onChange={onchangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Daliye' />
        <input required onChange={onchangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street/Gali no.' />

        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onchangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='PinCode' />
          <input required onChange={onchangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Contact No.' />

        </div>
      </div>
      {/* ----------- Right Side ----------- */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* ----------- Payment Method Selection ----------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>

            <div onClick={() => setmethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>

    

            <div onClick={() => setmethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          {/* Place Order button */}
          <div className=' w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>

    </form>

  )
}

export default PlaceOrder

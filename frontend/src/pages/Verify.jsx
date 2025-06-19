import React, { useContext,useEffect } from 'react'
import {ShopContext} from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const { navigate, token, setcartItems, backendUrl } = useContext(ShopContext)

    const [SearchParams, setSearchParams] = useSearchParams()
    // getting succes value and order id from the URl
    const success = SearchParams.get('success')
    const orderId = SearchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token){ // if the user is not logged in then show nothing
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe',{success,orderId},{headers:{token}})

            if (response.data.success){ // if payment is succesful
                setcartItems({}) //empty cart at frontend
                navigate('/orders') //navigate user to orders page

            }else{ // if the payment fails
                navigate('/cart') 
            }


        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

// run this funtion as soon as we are redirected to this page 
    useEffect(() => {
    verifyPayment()
    }, [token])
    

    return (
        <div>
            
        </div>
    )
}

export default Verify

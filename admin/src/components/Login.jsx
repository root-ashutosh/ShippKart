import React,{useState} from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({settoken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const onsubmitHandler = async (e) => {
       try {
        e.preventDefault() // to prevent page reloading

        // API CALL -- email&password will be added in request body
        const response = await axios.post(backendUrl + '/api/user/admin', {email,password})

        // if authentication is succesful -- i.e success = true & we will get one token
        if(response.data.success){
                settoken(response.data.token)

        }
        // if authentication fails -- display toast notification
        else{
                toast.error(response.data.message)
        }
        
       } catch (error) {
        console.log(error);
        toast.error(error.message)
        
       }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onsubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input onChange={(e)=> setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='email' placeholder='Enter Email' required/>
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input onChange={(e)=> setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='password' placeholder='Password' required/>
          </div>
          <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}


export default Login

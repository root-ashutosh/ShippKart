import React, { useContext, useState,useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setcurrentState] = useState('Login')

  const { token, settoken, navigate, backendUrl } = useContext(ShopContext)
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')


  // this handler is to prevent the page from reloading 
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      // if the currentstate is signUp then we will call the register APi else we will call the login API
    if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        // if Sign up is succesful
        if (response.data.success) {
          settoken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }
      // calling the login API
    else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
         // if Login up is succesful
        if (response.data.success) {
          settoken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
        
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
// redirecting user to Home page after login/signup
useEffect(() => {
  if(token){
    navigate('/')
  }
}, [token])



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 ' >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setname(e.target.value)} value={name} type="text" placeholder='Name' className='w-full px-3 py-2 border border-gray-800' required />}
      <input onChange={(e) => setemail(e.target.value)} value={email} type="email" placeholder='email' className='w-full px-3 py-2 border border-gray-800 ' required />
      <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" placeholder='password' className='w-full px-3 py-2 border border-gray-800' required />
      <div className=' w-full flex justify-between text-sm mt-[-8px]'>
        <p className=' cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setcurrentState('Sign Up')} className=' cursor-pointer'>Create account</p>
            : <p onClick={() => setcurrentState('Login')} className=' cursor-pointer'>Login</p>
        }
      </div>
      <button className=' bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'} </button>
    </form>
  )
}

export default Login

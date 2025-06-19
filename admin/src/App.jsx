import React,{useState,useEffect} from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


// exporting the backendURL stored in env
export const backendUrl = import.meta.env.VITE_BACKEND_URL
// exporting currency variable to use in List display
export const currency = '$'

const App = () => {
   
  // when initialising - if token is available in local storage store it else initialise with empty string
   const [token, settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '' )

  //  whenever token will be updated store it's value in local storage
   useEffect(() => {
     localStorage.setItem('token',token)

   }, [token])
   
    
  return (
    <div className='bg-gray-50 min-h-screen'>

      <ToastContainer/>
      
      {/* If token is empty then show login page else show whole page */}
      {token === "" 
      ? <Login settoken={settoken}/>  // passing settoken as a prop to get the token from login response
      : <>
        <Navbar settoken={settoken} />
        <hr />
        <div className='flex w-full'>
          <Sidebar />
          <div className='w-[70%] mx-auto ml-[max(5vw,25px) my-8 text-gray-600 text-base'>
            <Routes>
              <Route path='/add' element={<Add token={token} />} />
              <Route path='/list' element={<List token={token} />} />
              <Route path='/orders' element={<Order token={token} />} />
            </Routes>
          </div>
        </div>
      </>
   }
    </div>
  )
}

export default App

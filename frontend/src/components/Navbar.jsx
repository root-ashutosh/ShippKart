import React, { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'


const Navbar = () => {

    const [Visible, setVisible] = useState(false);
    const { setShowSearch, getcartcount, navigate, token, settoken, setCartItems } = useContext(ShopContext)

    // Function for logout functionality on profile icon
    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        settoken('')
        setCartItems({})
    }

    // on clicking the search bar navigate to collection page and open search bar
    const searchbarHandler = ()=>{
        setShowSearch(true)
        navigate('/collection')
    }


    return (
        <div className='flex items-center justify-between py-5 font-medium'>
           <Link to={'/'}><img src={assets.logo} className='w-36' alt="" /></Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700 ' >

                <NavLink to='/' className='flex flex-col items-center gap-1  '>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1  '>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1  '>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1  '>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

            </ul>


         <div className='flex items-center gap-6'>
                <img onClick={searchbarHandler} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

                <div className='group relative'>
                   <img onClick={()=> token ? '' : navigate('/login') } src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                   {/* Profile DropDown Menu - show only when logged in */}
                   {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 ' >
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
                            <p className='cursor-pointer hover:text-black '>My profile</p>
                            <p onClick={()=> navigate('/orders')} className='cursor-pointer hover:text-black '>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:text-black '>Log Out</p>

                        </div> 
                    </div>}


                </div>
                
                {/* Cart icon */}
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5 ' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] ' >{getcartcount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />

            </div>
            {/* sidebar menu for small screens */}
            <div className={`absolute top-0 right-0 bottom-0  overflow-hidden bg-white  transition-all ${Visible ? 'w-full' : 'w-0'}`}>
                <div  onClick={()=> setVisible(false)} className='flex flex-col text-gray-600 cursor-pointer '>
                    <div className='flex items-center gap-4 p-3'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink to='/' className='py-2 pl-6 border' >HOME</NavLink>
                    <NavLink to='/collection' className='py-2 pl-6 border' >COLLECTION</NavLink>
                    <NavLink to='/about' className='py-2 pl-6 border' >ABOUT</NavLink>
                    <NavLink to='/contact' className='py-2 pl-6 border' >CONTACT</NavLink>

                </div>
            </div>

        </div>
    )
}

export default Navbar

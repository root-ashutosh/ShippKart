import React, { useContext,useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets';
const SearchBar = () => {
    const { Search, setSearch, ShowSearch, setShowSearch } = useContext(ShopContext);

    //this state will help us to display the search bar only on collection page
    const [visible, setVisible] = useState(false);
    //useLocation Hook -- gives the path of the component
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    // it will show the search bar only when we are on the (collection page i.e visible is true) and (showSearch is true i.e search image is clicked) ELSE it will show nothing i.e null
    return ShowSearch && visible ? (
        <div className='border-t border-b bg-gray-100 text-center'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input value={Search}
                    onChange={(e) => setSearch(e.target.value)}
                    type='text' placeholder='Search Here'
                    className='flex-1 outline-none text-black bg-inherit text-sm placeholder-gray-600 '

                />
                <img className='w-4' src={assets.search_icon} alt="" />
            </div>
            <img src={assets.cross_icon}
                onClick={() => setShowSearch(false)}
                className='inline w-3 cursor-pointer'
                alt=""
            />
        </div>
    ) : null
};


export default SearchBar

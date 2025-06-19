import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products,Search,ShowSearch } = useContext(ShopContext);
  //this state is used to display filters in small screen
  const [showFilter, setshowFilter] = useState(false);

  const [filterProducts, setfilterProducts] = useState([]);

    // It will load all 52 products on first render of the component and store it in filterProducts state 
  useEffect(() => {
    setfilterProducts(products)

  }, [])
  
  //declaring two state array to store the checked category from both--categories & type
  const [Category, setCategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);

// function fo  check & uncheck of category
const toggleCategory = (e) => {
  // If the selected category already exists in the Category array-- i.e already checked
  if (Category.includes(e.target.value)) {
    // Remove it from the array i.e uncheck it
    setCategory(prev => prev.filter(item => item !== e.target.value))
  } else {
    // If it doesn't exist, add it to the array
    setCategory(prev => [...prev, e.target.value])
  }

  }
// function fo  check & uncheck of sub-category
const togglesubCategory = (e) => {
  // If the selected category already exists in the Category array-- i.e already checked
  if (subCategory.includes(e.target.value)) {
    // Remove it from the array i.e uncheck it
    setsubCategory(prev => prev.filter(item => item !== e.target.value))
  } else {
    // If it doesn't exist, add it to the array
    setsubCategory(prev => [...prev, e.target.value])
  }

  }

const applyFilter = () => {
  //creating a copy of the products array
  let productsCopy = products.slice();
  //this if block will show only those products whose name matches with what user has typed in the search bar
  if (Search && ShowSearch){
    productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(Search.toLowerCase())  )
  }
//if the user selects any Category from CATEGORIES then filter the copy array of products and keep only those products which matches the category
  if (Category.length > 0) {
    productsCopy = productsCopy.filter(item => Category.includes(item.category));
  }
//if the user selects any Category from TYPE then filter the copy array of products and leave only those products which matches the category
  if (subCategory.length > 0) {
    productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
  }

// displaying only selected categories & type of product on right side
  setfilterProducts(productsCopy);
}
//whenever there is a change in the FILTERS we will apply filter
// also when product loads from the database we will call applyfilter to display all products
useEffect(() => {
  applyFilter();

  }, [Category,subCategory,Search,ShowSearch,products])



  const [sortType, setsortType] = useState('relevant')
  // now we will sort the products based on price i.e sortType and deaultly show the relevant products
const sortProduct = () => {
  // creating a copy of the filterproduct array i.e the products which user has selected in filter 
  let fpCopy = filterProducts.slice();

  switch (sortType) {
    case 'low-high':
      setfilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
      break;

    case 'high-low':
      setfilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
      break;

    default:
      applyFilter();
      break;
  }
}
useEffect(() => {
  sortProduct()
}, [sortType])



  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setshowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} alt="" />
        </p>


        {/* Category Filters -- in small screen--> filters will be hidden and above small i.e in medium and large screen it will display as block*/}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} className='w-3' type='checkbox' value={'Men'}  /> Men
            </p>

            <p className='flex gap-2'>
              <input onChange={toggleCategory} className='w-3' type='checkbox' value={'Women'} /> Women
            </p>

            <p className='flex gap-2'>
              <input onChange={toggleCategory} className='w-3' type='checkbox' value={'Kids'} /> Kids
            </p>
          </div>
        </div>
        {/* subCategory filter i.e type secion */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input onChange={togglesubCategory}  className='w-3' type='checkbox' value={'Topwear'} /> Topwear
            </p>

            <p  className='flex gap-2'>
              <input onChange={togglesubCategory} className='w-3' type='checkbox' value={'Bottomwear'} /> Bottomwear
            </p>

            <p  className='flex gap-2'>
              <input onChange={togglesubCategory} className='w-3' type='checkbox' value={'WinterWear'} /> WinterWear
            </p>
          </div>
        </div>
      </div>

      {/* right side of colllection i.e all collection part */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Product Sort */}
          <select onChange={(e)=> setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Render all the available products in filterProducts state and display them on right side */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            // list rendering
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          }
        </div>
      </div>

    </div>

  )

}

export default Collection

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';

const Product = () => {

  //it gives the dynamic variable i.e here product Id
  const { productId } = useParams();

  const { products, currency, addtoCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [Image, setImage] = useState('');
  const [Size, setSize] = useState('')

  // fetching the details of that product from product array whose product id matches the id in route path i.e the product on which user has clicked
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }
  useEffect(() => {
    fetchProductData()

  }, [productId, products])

  // we are using a ternary operator to display the product on product page -- so if product data is not present we will display nothing by doing opacity-0
  return productData ? (
    <div>
      <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* Product Data */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

          {/* -------- Product Images -------- */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            {/* displaying list of images */}
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item, index) => (
                  <img
                    onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                ))
              }
            </div>
            {/* displaying large image */}
            <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={Image} alt="" />
            </div>
          </div>

     

      {/* -------- Product Info -------- */}
      <div className='flex-1'>
        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
        <div className='flex items-center gap-1 mt-2'>
          <img src={assets.star_icon} alt="" className='w-3 5' />
          <img src={assets.star_icon} alt="" className='w-3 5' />
          <img src={assets.star_icon} alt="" className='w-3 5' />
          <img src={assets.star_icon} alt="" className='w-3 5' />
          <img src={assets.star_dull_icon} alt="" className='w-3 5' />
          <p className='pl-2'>(122)</p>
        </div>
        <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
        <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
        
          {/* sizes menu */}

        <div className='flex flex-col gap-4 my-8'>
          <p>Select Size</p>
          <div className='flex gap-2'>
            {/* rendering size array of each product and displaying as button */}
            {productData.sizes.map((item, index) => (
              // we are storing the size which user has clicked on so that we can highlight it using ternary operator
              <button key={index} onClick={() => setSize(item)}
                className={`border py-2 px-4 bg-gray-100 
            ${item == Size ? 'border-orange-500' : ' '}`} >
                {item}</button>
            ))}
          </div>
        </div>
                {/* Add to cart */}

        <button onClick={()=> addtoCart(productData._id,Size)} className=' bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
        <hr className='mt-8  sm:w-4/5' />
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'></div>
        <p>100% Original product</p>
        <p>Cash on delivery is available</p>
        <p>Easy return and exchange policy withing 7 days</p>
      </div>
    </div >
 </div >
{/* ----------- Description & Review Section ------------ */}
<div className='mt-20'>
  <div className='flex'>
    <b className='border px-5 py-3 text-sm'>Description</b>
    <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
  </div>

  <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
    <p>An e-commerce website is an online platform that facilitates the buying and selling of goods and services over the internet.</p>
    <p>E-commerce websites typically display products or services along with detailed descriptions, prices, images, and reviews.</p>
  </div>
</div>


</div >

 ) : <div className='opacity-0'></div>
}


export default Product

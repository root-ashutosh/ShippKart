import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSelller = () => {
    const { products } = useContext(ShopContext)
    const [bestSeller, setbestSeller] = useState([]);

    // adding 5 best seller product from product array where bestseller is set true
    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller))
        setbestSeller(bestProduct.slice(0, 5))

    }, [products])
    // upar i have added this product in dependency after linking the frontend products with the database so whenever the product loads from database it will get displayed 

    return (
        <div className=' my-10'>
            <div className=' text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLER'} />
                <p className=' w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, excepturi.
                </p>
            </div>
            {/* rendering best seller products and displaying it by mounting ProductItem component */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>

        </div>
    )
}

export default BestSelller

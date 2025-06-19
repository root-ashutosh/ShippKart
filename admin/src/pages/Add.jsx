import React,{useState} from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  
  // state variables to store data
  const [image1, setimage1] = useState(false)
  const [image2, setimage2] = useState(false)
  const [image3, setimage3] = useState(false)
  const [image4, setimage4] = useState(false)

  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [category, setcategory] = useState("Men")
  const [subCategory, setsubCategory] = useState("Topwear")
  const [bestseller, setbestseller] = useState(false)
  const [sizes, setsizes] = useState([])
// to prevent page from reloading on submitting the form
 const onsubmitHandler = async (e) => {
  e.preventDefault()
  // we will add this form data in the body when we will add the API CALL
  try {
    const formData = new FormData()
    // adding all information in formdata
    formData.append("name",name)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("category",category)
    formData.append("subCategory",subCategory)
    formData.append("bestseller",bestseller)
    // we are getting the sizes as array so we cannot directly send the array as form data so for that we will first convert it to string
    formData.append("sizes",JSON.stringify(sizes))
  //  adding all the images in formdata -- only the uploaded images
  // 1st checking if image available then append to avoid error
    image1 && formData.append("image1",image1)
    image2 && formData.append("image2",image2)
    image3 && formData.append("image3",image3)
    image4 && formData.append("image4",image4)

    // API CALL --- sending formdata in the body of the request
    const response = await axios.post(backendUrl + '/api/product/add',formData,{headers:{token}})
    console.log(response.data);


    // Now after the form is submitted succesfully we will make the form empty
    if(response.data.success){
      toast.success(response.data.message)
       
      setname("")
      setdescription("")
      setimage1(false)
      setimage2(false)
      setimage3(false)
      setimage4(false)
      setprice("")

    // if submission fails
    }else{
      toast.error(response.data.message)
    }
    

  } catch (error) {
    console.log(error);
    toast.error(error.message)
    
  }
 }

  return (
<form onSubmit={onsubmitHandler} className='flex flex-col w-full items-start gap-3'>
  <div>
    <p className='mb-2'>Upload Image</p>
    
    {/* IMAGE UPLOAD AREA */}
    <div className='flex gap-2'>
      <label htmlFor="image1">
        {/* when image not available display upload icon */}
        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
        {/* on adding the image store it */}
        <input onChange={(e)=> setimage1(e.target.files[0])} type="file" id="image1" hidden />
      </label>
      <label htmlFor="image2">
        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
        <input onChange={(e)=> setimage2(e.target.files[0])} type="file" id="image2" hidden />
      </label>
      <label htmlFor="image3">
        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
        <input onChange={(e)=> setimage3(e.target.files[0])} type="file" id="image3" hidden />
      </label>
      <label htmlFor="image4">
        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
        <input onChange={(e)=> setimage4(e.target.files[0])} type="file" id="image4" hidden />
      </label>
    </div>
  </div>

  {/* PRODUCT DETAILS SECTION */}

    <div className='w-full'>
  <p className='mb-2'>Product name</p>
  <input onChange={(e)=> setname(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2'
    type='text'
    placeholder='Type here' required/>
</div>

<div className='w-full'>
  <p className='mb-2'>Product description</p>
  <textarea onChange={(e)=> setdescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2'
    type='text'
    placeholder='Write here' required/>
</div>

<div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
  <div>
    <p className='mb-2'>Product Category</p>
    <select onChange={(e)=>setcategory(e.target.value)} className='w-full px-3 py-2'>
      <option value="Men">Men</option>
      <option value="Women">Women</option>
      <option value="Kids">Kids</option>
    </select>
  </div>
  <div>
    <p className='mb-2'>Sub Category</p>
    <select onChange={(e)=>setsubCategory(e.target.value)} className='w-full px-3 py-2'>
      <option value="Topwear">Topwear</option>
      <option value="Bottomwear">Bottomwear</option>
      <option value="Winterwear">Winterwear</option>
    </select>
  </div>
  <div>
    <p className='mb-2'>Product Price</p>
    <input onChange={(e)=> setprice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25'/>
  </div>
</div>
<div>
  <p className='mb-2'>Product Sizes</p>
  <div className='flex gap-3'>
    {/* here we are checking if that size already exits then remove it else add it */}
    <div onClick={()=>setsizes(prev => prev.includes("S") ? prev.filter(item => item!== "S") : [...prev,"S"])}>

      <p className={`${sizes.includes("S") ? "bg-slate-400" : "bg-amber-200"} bg-slate-200 px-3 py-1 cursor-pointer`}>S</p>
    </div>
    <div onClick={()=>setsizes(prev => prev.includes("M") ? prev.filter(item => item!== "M") : [...prev,"M"])}>
      <p className={`${sizes.includes("M") ? "bg-slate-400" : "bg-amber-200"} bg-slate-200 px-3 py-1 cursor-pointer`}>M</p>
    </div>
    <div onClick={()=>setsizes(prev => prev.includes("L") ? prev.filter(item => item!== "L") : [...prev,"L"])}>
      <p className={`${sizes.includes("L") ? "bg-slate-400" : "bg-amber-200"} bg-slate-200 px-3 py-1 cursor-pointer`}>L</p>
    </div>
    <div onClick={()=>setsizes(prev => prev.includes("XL") ? prev.filter(item => item!== "XL") : [...prev,"XL"])}>
      <p className={`${sizes.includes("XL") ? "bg-slate-400" : "bg-amber-200"} bg-slate-200 px-3 py-1 cursor-pointer`}>XL</p>
    </div>
    <div onClick={()=>setsizes(prev => prev.includes("XXL") ? prev.filter(item => item!== "XXL") : [...prev,"XXL"])}>
      <p className={`${sizes.includes("XXL") ? "bg-slate-400" : "bg-amber-200"} bg-slate-200 px-3 py-1 cursor-pointer`}>XXL</p>
    </div>
  </div>
  <div className='flex gap-2 mt-2'>
    {/* if bestseller is checked then uncheck vice versa */}
    <input onChange={()=> setbestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller'/>
    <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
  </div>
  <button type='submit' className='w-28 py-2 mt-4 bg-black text-white '>Add</button>
</div>


</form>

  )
}

export default Add

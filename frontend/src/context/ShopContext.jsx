import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    // importing backend url from env
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    // token for login authetication
    const [token, settoken] = useState('')

    const currency = '$';
    const delivery_fee = 10;
    const [Search, setSearch] = useState('')
    //when this showsearch is true we will show the search bar else we will hide the search bar
    const [ShowSearch, setShowSearch] = useState(false)

    // This cartItems will store the data of all the products present in cart
    const [cartItems, setcartItems] = useState({})

    // funtion to add items in cart
    const addtoCart = async (itemId, size) => {

        //if the user has not selected any size before adding to cart then this will give a pop up notification and stop item from being added to cart
        // if(!size){ this gave error
        //     toast.error('Select Product Size');
        //     return;
        // }
        if (!size) {
            console.log("Size missing:", size);
            toast.error("Select Product Size");
            return;
        }
        // we are copying the data of cartItem in cartdata i.e an Object 
        // since cartItem is an object we have to use structuredClone to copy
        let cartData = structuredClone(cartItems)
        // if a product with this id already exists in the cart
        if (cartData[itemId]) {
            //then we will check if the same size product exists in cart then increase the no.of products by 1 else will set it as 1 i.e its the same product of this id but of another size
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            // if the product of same id doesnt already exist in the cart then we will simply add the product of that size since its a fresh product
            // creating an object for that id to store multiple sizes of same
            cartData[itemId] = {};

            cartData[itemId][size] = 1;

        }
        setcartItems(cartData)

        // if we are logged in then update the cart in database too
        if (token) {

            try {

                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })


            } catch (error) {
                console.log(error);
                toast.error(error.message)

            }
        }




    }

    //funtion to give total no. of proucts of that size 
    const getcartcount = () => {
        let totalcount = 0
        for (const item in cartItems) {
            for (const sizz in cartItems[item]) {
                try {
                    if (cartItems[item][sizz] > 0) {
                        totalcount += cartItems[item][sizz]

                    }
                } catch (error) {


                }
            }
        }
        return totalcount
    }

    // cartitems is object of object type 
    // {id : {size:quantity}}
    // useEffect(() => {
    //     console.log(cartItems);

    // }, [cartItems])

    // funtion to update items quantity in cart
    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity

        setcartItems(cartData)

        // if we are logged in then update the cart in database too
        if (token) {

            try {

                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })


            } catch (error) {
                console.log(error);
                toast.error(error.message)

            }
        }

    }

    // function to get total amount of cart products
    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);

            for (const sizess in cartItems[items]) {
                try {
                    if (cartItems[items][sizess] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][sizess];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    };

    // creating an instance of navigate here to use it in cart for checkout
    const navigate = useNavigate()



    // funtion to get products data from the API
    const [products, setproducts] = useState([])

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')

            // if data is fetched successfuly
            if (response.data.success) {
                setproducts(response.data.products);
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }
    //  load the products data while loading the page
    useEffect(() => {
        getProductsData()
    }, [])


    // whenever we will load the page our cartdata will be fetched from database so it will not dissappear now
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})

            // saving in cart to display
            setcartItems(response.data.cartData)

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // Now we will set the token in the state variable from localstorage to keep us logged in after refreshing
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            settoken(localStorage.getItem('token'))

            // if we are logged in then fetch the cartdata from database whenever page reloads so that it does not dissappear
            getUserCart(localStorage.getItem('token'))
        }
    }, [])






    const value = {
        products, currency, delivery_fee, Search, setSearch,
        ShowSearch, setShowSearch, cartItems, addtoCart,
        getcartcount, updateQuantity, getCartAmount, navigate, backendUrl
        , settoken, token,setcartItems
    }
    return (

        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;
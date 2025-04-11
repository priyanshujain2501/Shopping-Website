import axios from "axios";
import { createContext , useEffect, useState } from "react";

export const Context = createContext();

function ContextProvider({children}) {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cartItems, setCartItems] = useState({});

    const token = localStorage.getItem("token");

    const fetchAllCategories = async () => {

        const res = await axios.get("https://fakestoreapi.com/products")

        const tempSet = new Set();

        if(res.status === 200){
            
            res.data.map((prod)=>{
                
                tempSet.add(prod.category)

            })

            setCategories([...tempSet])

        }

    }

    const addToCart = (itemId) => {

        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

    }

    const removeFromCart = (itemId) => {
        
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

    }

    const getCartTotalAmt = () => {

        let totalAmt = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id == item);
                totalAmt += itemInfo.price * cartItems[item];
            }

        }

        return totalAmt;

    }

    useEffect(()=>{
        fetchAllCategories()
    },[])

    const contextValue = {
        products,
        setProducts,
        categories, 
        cartItems, 
        setCartItems,
        addToCart,
        removeFromCart,
        getCartTotalAmt,
        token,
    }

    return(
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )

}

export default ContextProvider;
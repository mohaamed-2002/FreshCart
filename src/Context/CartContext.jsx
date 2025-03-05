import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const CartContext= createContext()

export default function CartContextProvider({children}){

    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartId, setCartId] = useState(null)

    const headers= {token: localStorage.getItem('token')}

    function addToCart(id){
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:id},
            {headers,}
        ).then((res)=>res.data).catch((err)=>err)
    }

    function getLoggedCartData(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
            {headers,}
        ).then((res)=>res.data).catch((err)=>err)
    }

    function reomveCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((res=> res.data)).catch((err)=>err)
    }


    function updateProductQuantity(productId,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:count},{headers})
        .then((res=> res.data)).catch((err)=>err)
    }

    function clearCart(){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{headers})
        .then((res=> res.data)).catch((err)=>err)
    }


    function cashOnDelivery(data) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,data,{headers})
        .then((res=> res.data)).catch((err)=>err)
    }

    function onlinePayment(data){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,data,
        {
            params:{url:'http://localhost:5173'}, headers
        })
        .then((res=> res.data)).catch((err)=>err)
    }


    


    async function getData() {
       let res= await getLoggedCartData()
        setNumOfCartItems(res.numOfCartItems)
        setCartId(res.cartId)
    }

    useEffect(() => {
        getData()
    }, [])
    

    return <CartContext.Provider value={{addToCart , getLoggedCartData,reomveCartItem,updateProductQuantity,clearCart,numOfCartItems,setNumOfCartItems,setCartId,cashOnDelivery,onlinePayment}}>
        {children}
    </CartContext.Provider>

}
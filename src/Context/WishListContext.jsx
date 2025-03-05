import axios from "axios";
import { createContext } from "react";

export const WishListContext = createContext()


export default function WishListContextProvider({ children }) {

    const headers = {
        token: localStorage.getItem('token'),
    }
    
    function addToWishList(id) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {productId: id}, { headers })
        .then((res) => res.data).catch((err) => err)
    }
    
    function getLoggedWishListData(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
            {headers,}
        ).then((res)=>res.data).catch((err)=>err)
    }

    function reomveWishList(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
        .then((res=> res.data)).catch((err)=>err)
    }


    return <WishListContext.Provider value={{addToWishList,getLoggedWishListData,reomveWishList}}>

        {children}
    </WishListContext.Provider>

}
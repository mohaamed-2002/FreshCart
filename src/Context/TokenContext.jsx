import { useEffect } from "react";
import { createContext, useState } from "react";

export const tokenContext=createContext()

export default function TokenContextProvider({children}){
    const [token, setToken] = useState(null)

    useEffect(() => {
if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'))
}
    }, [])
    

    return (
        <tokenContext.Provider value={{token , setToken}}>

            {children}

        </tokenContext.Provider>
    )
}
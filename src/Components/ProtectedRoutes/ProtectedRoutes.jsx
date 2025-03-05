import React from 'react'
import { Navigate } from 'react-router-dom'

export default function protectedRoutes({children}) {

if (localStorage.getItem('token')){
    //return com

    return children
}else{
    //navigate to login
    return <Navigate to={'/login'}/>
}



}

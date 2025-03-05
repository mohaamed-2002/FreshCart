import React, { useEffect, useState } from 'react'
import  axios  from 'axios';
import Loader from '../../Components/Loader/Loader';
import { Link } from 'react-router-dom';


export default function Brands() {

    const [brands, setBrands] = useState([])

    async function getBrands(){
        //call api
    await axios.get('https://ecommerce.routemisr.com/api/v1/brands').then((res)=>{
        setBrands(res.data.data);
    }).catch((err)=>{
        console.log(err);    
    })
    }
    
    useEffect(() => {
        //getproduct()
        getBrands()
    }, [])
    
    useEffect(() => {
      document.title = 'Brands';
    }, []);

  return (
        <div className='p-5 row justify-center '>
          
          {brands.length>0? brands.map((brands) => <div className=' product border p-2  border-neutral-300 rounded-md  xl:w-1/5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 m-5' key={brands._id}>
            <img src={brands.image} className='w-full h-80' alt="" />
            <h1 className='text-center font-bold mt-2'>{brands.name}</h1>
          
            
          </div>)
          :<Loader/>}
        </div>
  )
}

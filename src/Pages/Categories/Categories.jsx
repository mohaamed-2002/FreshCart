import React, { useEffect, useState } from 'react'
import  axios  from 'axios';
import Loader from './../../Components/Loader/Loader';


export default function Categories() {

  const [categories, setCategories] = useState([])
  
  async function getcategories(){
    //call api
await axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((res)=>{
  setCategories(res.data.data);
}).catch((err)=>{
    console.log(err);    
})
}

useEffect(() => {
    //getproduct()
    getcategories()
}, [])

useEffect(() => {
  document.title = 'Categories';
}, []);

  return (
    <div className='p-5 row justify-center '>
      {categories.length>0? categories.map((categories) => <div className=' product border p-2  border-neutral-300 rounded-md  xl:w-1/6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 m-5' key={categories._id}>
        <img src={categories.image} className='w-full h-80' alt="" />
        <h1 className='text-center font-bold mt-2'>{categories.name}</h1>
      
        
      </div>)
      :<Loader/>}
    </div>
  )
}

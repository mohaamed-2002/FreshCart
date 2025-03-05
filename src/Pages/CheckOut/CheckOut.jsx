import { Formik, useFormik } from "formik";
import { useContext, useEffect } from "react";
import * as Yup from 'yup'
import { CartContext } from "../../Context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

export default function CheckOut() {

    const {cashOnDelivery,setCartId,setNumOfCartItems,onlinePayment} = useContext(CartContext)
    const navigate=useNavigate()

    const {state}=useLocation()


      const validationSchema = Yup.object({
        details: Yup.string().required(),
        phone: Yup.string().required(),
        city: Yup.string().required(),

      })
    
async function handleSubmit(data) {

  if(state==='online'){
    let res= await onlinePayment({ shippingAddress: data })
    console.log(res);
    if (res.status==='success'){
      window.location.href=res.session.url
    }

  }else{
    let res= await cashOnDelivery({ shippingAddress: data })
      
    if (res.status){
        setCartId(null)
        setNumOfCartItems(0)
        
        navigate('/allorders')

    }

  }


}

      const formik = useFormik({
        initialValues,
        //validate:validateData,
        validationSchema,
        onSubmit: handleSubmit,
      });
    
        useEffect(() => {
          document.title = 'CheckOut';
        }, []);

  return (
    <div className=" dark:bg-gray-900 w-1/2 mx-auto bg-gray-50 shadow p-3 my-3">
        <h5 className="mb-4 font-bold text-2xl">CheckOut</h5>
            <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
            <input onChange={formik.handleChange} type="text" id="details" name="details" onBlur={formik.handleBlur} value={formik.values.details} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter Your details" />
            {(formik.touched.details && formik.errors.details) && (<small className="text-red-600">{formik.errors.details}</small>)}
          </div>
          <div className="mb-5">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
            <input onChange={formik.handleChange} type="text" id="phone" name="phone" onBlur={formik.handleBlur} value={formik.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter Your phone" />
            {(formik.touched.phone && formik.errors.phone) && (<small className="text-red-600">{formik.errors.phone}</small>)}
          </div>
          <div className="mb-5">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
            <input onChange={formik.handleChange} type="text" id="city" name="city" onBlur={formik.handleBlur} value={formik.values.city} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter Your city" />
            {(formik.touched.city && formik.errors.city) && (<small className="text-red-600">{formik.errors.city}</small>)}
          </div>

          <button type="submit"  className="text-white bg-green-700 hover:bg-green-800 disabled:bg-green-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Submit</button>

        </form>
    </div>
  )
}

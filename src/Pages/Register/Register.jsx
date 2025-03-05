import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'

export default function Register() {

  const [errorMsg, setErrorMsg] = useState(null);
  const [isloding, setIsLoding] = useState(false);
  const navigate=  useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  };


  async function handleRegister(data) {
    setIsLoding(true)
    //call api by (axios)
    //console.log(data);
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",data).then((response) => {
      //console.log(response);
      setErrorMsg(null);
      setIsLoding(false);
      navigate('/login')
    })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setIsLoding(false)
      });

  }


  {/* 
    function validateData(data){
    console.log(data);

    let errors={};
    const NameRegex= /^[A-Z][a-z]{1,15}$/;
    const emailRegex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    const passwordRegex=/^[A-Za-z1-9]{8,12}$/
    const phoneRegex=/^01[0125][0-9]{8}$/

    if (data.name ===""){
      errors.name="Name is required"
    } else if (!NameRegex.test(data.name)){
      errors.name = "Name must start with capital letter"
    }

    if (data.email ===""){
      errors.email="email is required"
    } else if (!emailRegex.test(data.email)){
      errors.email = "email not valid"
    }

    if (data.password ===""){
      errors.password="password is required"
    } else if (!passwordRegex.test(data.password)){
      errors.password = "password not valid"
    }

    if (data.repassword ===""){
      errors.repassword="rePassword is required"
    } else if (data.repassword!==data.password){
      errors.repassword = "rePassword dose not match password"
    }

    if (data.phone ===""){
      errors.phone="phone is required"
    } else if (!phoneRegex.test(data.phone)){
      errors.phone = "phone not valid"
    }
    

    return errors;
    
  } 
    */}

  const validationSchema = Yup.object({
    name: Yup.string().required().max(20).min(2),
    email: Yup.string().email().required(),
    password: Yup.string().required().matches(/^[A-Za-z1-9]{8,12}$/, 'password not valid'),
    rePassword: Yup.string().required().oneOf([Yup.ref('password')], "rePassword dose not match password"),
    phone: Yup.string().required().matches(/^01[0125][0-9]{8}$/, 'phone not valid'),
  })

  const formik = useFormik({
    initialValues,
    //validate:validateData,
    validationSchema,
    onSubmit: handleRegister,
  });

    useEffect(() => {
      document.title = 'Register';
    }, []);


  return (
    <>
      <section className=" dark:bg-gray-900 w-full md:w-1/2 mx-auto bg-gray-50 shadow p-3 my-3">
        <h1 className="text-3xl font-bold my-3">Register Now</h1>

        {errorMsg && <div className="bg-red-300 p-3 rounded-md my-2">{errorMsg}</div>}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <input onChange={formik.handleChange} type="text" id="name" name="name" onBlur={formik.handleBlur} value={formik.values.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter Your Name" />
            {(formik.touched.name && formik.errors.name) && (<small className="text-red-600">{formik.errors.name}</small>)}
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" value={formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Entar Your Email" />
            {(formik.touched.email && formik.errors.email) && (<small className="text-red-600">{formik.errors.email}</small>)}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
            <input onChange={formik.handleChange} type="password" onBlur={formik.handleBlur} id="password" name="password" value={formik.values.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter password" />
            {(formik.touched.password && formik.errors.password) && (<small className="text-red-600">{formik.errors.password}</small>)}
          </div>
          <div className="mb-5">
            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword</label>
            <input onChange={formik.handleChange} type="password" id="rePassword" onBlur={formik.handleBlur} name="rePassword" value={formik.values.rePassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter rePassword" />
            {(formik.touched.rePassword && formik.errors.rePassword) && (<small className="text-red-600">{formik.errors.rePassword}</small>)}
          </div>
          <div className="mb-5">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
            <input onChange={formik.handleChange} type="tel" id="phone" name="phone" onBlur={formik.handleBlur} value={formik.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter Your phone" />
            {(formik.touched.phone && formik.errors.phone) && (<small className="text-red-600">{formik.errors.phone}</small>)}
          </div>

          {isloding ? (<button disabled className="text-white bg-green-700 hover:bg-green-800 disabled:bg-green-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Loading ...</button>
          ) : (<button type="submit" disabled={(!formik.isValid)} className="text-white bg-green-700 hover:bg-green-800 disabled:bg-green-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Register</button>
          )}
          <small>Already have account! <Link to={'/Login'} className="text-green-700 font-bold">Login</Link > </small>
        </form>

      </section>
    </>

  );
}

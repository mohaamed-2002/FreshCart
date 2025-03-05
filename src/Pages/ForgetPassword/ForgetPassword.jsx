import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';

export default function ForgetPassword() {

    const [errorMsg, setErrorMsg] = useState(null);
    const [isloding, setIsLoding] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        email: "",
    };

    async function handleForgetPassword(data) {
        setIsLoding(true);
        //call api by (axios)
        //console.log(data);
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", data).then((response) => {
            //console.log(response);
            localStorage.setItem('token', response.data.token);
            setErrorMsg(null);
            setIsLoding(false);
            navigate('/verificationcode');
        })
        .catch((error) => {
            setErrorMsg(error.response.data.message);
            setIsLoding(false);
        });
    }

        useEffect(() => {
          document.title = 'Forget Password';
        }, []);

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleForgetPassword,
    });

    return (
        <>
            <section className="dark:bg-gray-900 w-1/2 mx-auto bg-gray-50 shadow p-3 my-3">
                <h1 className="text-3xl font-bold my-3">Forget Password</h1>

                {errorMsg && <div className="bg-red-300 p-3 rounded-md my-2">{errorMsg}</div>}

                <form onSubmit={formik.handleSubmit}>

                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" value={formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" />
                        {(formik.touched.email && formik.errors.email) && (<small className="text-red-600">{formik.errors.email}</small>)}
                    </div>

                    {isloding ? (
                        <button disabled className="text-white bg-green-700 hover:bg-green-800 disabled:bg-green-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Loading ...</button>
                    ) : (
                        <button type="submit" disabled={!formik.isValid || isloding} className="btn">Submit</button>
                    )}
                </form>

            </section>
        </>
    );
}


{/*
    import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'

export default function ForgetPassword() {

    const [errorMsg, setErrorMsg] = useState(null);
    const [isloding, setIsLoding] = useState(false);
    const navigate=  useNavigate();

    const initialValues = {
        email: "",
      };

      async function handleForgetPassword(data) {
        setIsLoding(true)
        //call api by (axios)
        console.log(data);
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",data).then((response) => {
          console.log(response);
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          setErrorMsg(null);
          setIsLoding(false);
          navigate('/')
        })
          .catch((error) => {
            setErrorMsg(error.response.data.message);
            setIsLoding(false)
          });
    
      }

        const validationSchema = Yup.object({
          email: Yup.string().email().required(),
        })

          const formik = useFormik({
            initialValues,
            //validate:validateData,
            validationSchema,
            onSubmit: handleRegister,
          });


  return (
    <>
    <section className=" dark:bg-gray-900 w-1/2 mx-auto bg-gray-50 shadow p-3 my-3">
      <h1 className="text-3xl font-bold my-3">Forget Password</h1>

      {errorMsg && <div className="bg-red-300 p-3 rounded-md my-2">{errorMsg}</div>}

      <form onSubmit={formik.handleSubmit}>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" value={formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Entar Your Email" />
          {(formik.touched.email && formik.errors.email) && (<small className="text-red-600">{formik.errors.email}</small>)}
        </div>

        {isloding ? (<button disabled className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Loading ...</button>
        ) : (<button type="submit" disabled={(!formik.isValid)} className="btn">Login</button>
        )}
        <small>Create New Account <Link to={'/register'}>Register</Link > </small>
      </form>

    </section>
  </>
  )
}
    */}

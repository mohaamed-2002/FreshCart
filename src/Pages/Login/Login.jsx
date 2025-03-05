import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { tokenContext } from "../../Context/TokenContext";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isloding, setIsLoding] = useState(false);
  const navigate=  useNavigate();
  const {setToken} = useContext(tokenContext)

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    document.title = 'Login';
  }, []);


  async function handleLogin(data) {
    setIsLoding(true)
    //call api by (axios)
    //console.log(data);
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",data).then((response) => {
      //console.log(response);
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
    password: Yup.string().required().matches(/^[A-Za-z1-9]{8,12}$/, 'password not valid'),
  })

  const formik = useFormik({
    initialValues,
    //validate:validateData,
    validationSchema,
    onSubmit: handleLogin,
  });


  return (
    <>
      <section className="dark:bg-gray-900 w-full md:w-1/2 mx-auto bg-gray-50 shadow p-3 my-3">
        <h1 className="text-3xl font-bold my-3">Login Now</h1>

        {errorMsg && <div className="bg-red-300 p-3 rounded-md my-2">{errorMsg}</div>}

        <form onSubmit={formik.handleSubmit}>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" value={formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Entar Your Email" />
            {(formik.touched.email && formik.errors.email) && (<small className="text-red-600">{formik.errors.email}</small>)}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
            <input onChange={formik.handleChange} type="password" onBlur={formik.handleBlur} id="password" name="password" value={formik.values.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter password" />
            {(formik.touched.password && formik.errors.password) && (<small className="text-red-600">{formik.errors.password}</small>)}
          </div>

          {isloding ? (<button disabled className="text-white bg-green-700 hover:bg-green-800 disabled:bg-green-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Loading ...</button>
          ) : (<button type="submit" disabled={(!formik.isValid)} className="btn">Login</button>
          )}
          <small><Link to={'/forgetpassword'} className="text-green-900 font-semibold ">Forget Your Password ?</Link > </small>
        </form>

      </section>
    </>

  );
}

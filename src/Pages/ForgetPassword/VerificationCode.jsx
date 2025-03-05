import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';

export default function VerificationCode() {

    const [errorMsg, setErrorMsg] = useState(null);
    const [isloding, setIsLoding] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        resetCode:""
    };

    async function handleVerificationCode(data) {
        setIsLoding(true);
        //call api by (axios)
        //console.log(data);
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", data).then((response) => {
            //console.log(response);
            localStorage.setItem('token', response.data.token);
            setErrorMsg(null);
            setIsLoding(false);
            navigate('/resetrassword');
        })
        .catch((error) => {
            setErrorMsg(error.response.data.message);
            setIsLoding(false);
        });
    }

    useEffect(() => {
        document.title = 'Verification Code';
      }, []);

    const validationSchema = Yup.object({
        resetCode: Yup.string().required()
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleVerificationCode,
    });

    return (
        <>
            <section className="dark:bg-gray-900 w-1/2 mx-auto bg-gray-50 shadow p-3 my-3">
                <h1 className="text-3xl font-bold my-3">Forget Password</h1>

                {errorMsg && <div className="bg-red-300 p-3 rounded-md my-2">{errorMsg}</div>}

                <form onSubmit={formik.handleSubmit}>

                    <div className="mb-5">
                        <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verification Code</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="resetCode" name="resetCode" value={formik.values.resetCode} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Verification Code" />
                        {(formik.touched.resetCode && formik.errors.resetCode) && (<small className="text-red-600">{formik.errors.resetCode}</small>)}
                    </div>

                    {isloding ? (
                        <button disabled className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Loading ...</button>
                    ) : (
                        <button type="submit" disabled={!formik.isValid || isloding} className="btn">Submit</button>
                    )}
                </form>

            </section>
        </>
    );
}
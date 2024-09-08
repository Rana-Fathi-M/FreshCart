import React, { useContext, useEffect, useState } from 'react'
import './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

function Login() {
  const { setToken } = useContext(UserContext)
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const schema = Yup.object().shape({
    email: Yup.string().required('email is required').email('email is not valid'),
    password: Yup.string().required(' password is required').matches(/^[A-Z].{5,}/, 'Wrong Password') 
  })
  const navigate = useNavigate();

  const formik = useFormik({

    initialValues: {
      email: '',
      password: ''
    },

    onSubmit: handleSubmit,

    validationSchema: schema

  })

  // const { data, isLoading, isError, error } = new useQuery({
  //   queryKey: ['login'],
  //   queryFn: axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values),
  //   onSuccess: (data) => {
  //     navigate('/')
  //     setToken(data.data.token)
  //   }
  // })

  // if (isError) {
  //   setErrMsg(error.response.data.message)
  //   console.log(error.response.data.message);
    
  // }



  async function handleSubmit(values) {

    setIsLoading(true)
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      if (data.message == "success") {
        navigate('/')
        setToken(data.token)
      }
    }
    catch (err) {
      setErrMsg(err.response.data.message);
    }
    finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    console.log('Mounting Login');

  }, []);
  return (
    <div className='pt-28'>
      <h1 className='text-center text-green-500'>Login</h1>

      {errMsg ? (<div
            className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-red-600 dark:bg-opacity-15 dark:text-red-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              {errMsg}
            </div>
          </div>) : null}

      <form className=" mt-4 mx-auto" onSubmit={formik.handleSubmit}>

        <div className="relative z-0 w-full mb-5 group">

          <input type="email" name="email" id="email" {...formik.getFieldProps('email')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>

          {formik.errors.email && formik.touched.email ?  <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-red-600 dark:bg-opacity-15 dark:text-red-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
            {formik.errors.email}
            </div>
          </div>: null}

        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>

          {formik.errors.password && formik.touched.password ? 
           <div
           className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-red-600 dark:bg-opacity-15 dark:text-red-400"
           role="alert"
         >
           <svg
             className="flex-shrink-0 inline w-4 h-4 me-3"
             aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg"
             fill="currentColor"
             viewBox="0 0 20 20"
           >
             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
           </svg>
           <span className="sr-only">Info</span>
           <div>
           {formik.errors.password}
           </div>
         </div> : null}

        </div>
        <div className="my-4 text-sm">
          <Link to="/forgotpassword" className="text-green-600 hover:underline">Forgot your password?</Link>
        </div>

        <button disabled={isLoading} type="submit" className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">

          {isLoading ? <FaSpinner className='animate-spin' /> : "Login"}

        </button>
      </form>

    </div>
  )
}
export default Login
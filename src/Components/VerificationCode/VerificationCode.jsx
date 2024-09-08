import React, { useEffect, useState } from 'react'
import style from './VerificationCode.module.css';
import axios from 'axios';
import { useFormik } from 'formik';
import {  useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

export default function VerificationCode() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    console.log('Verify Code Mounting');

  }, [])

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: submitForm,
  })

  async function submitForm(values) {
    setIsLoading(true)
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
      if (data.status == 'Success') {
        navigate('/resetpassword')
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='pt-28'>
      <h1 className='text-center text-green-500'>Verify Your Code</h1>

      <form onSubmit={formik.handleSubmit} className="max-w-screen-lg mx-auto mt-14"  >
        <div className="relative z-0 w-full mb-6 group ">
          <input
            {...formik.getFieldProps("resetCode")}
            type="text"
            name="resetCode"
            id="resetCode"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
          />
          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            code :
          </label>
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
        </div>

        <div className="flex justify-between ">
          <button
           disabled={isLoading} type="submit" className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
           >
          {isLoading ? <FaSpinner className='animate-spin' /> : "Verify Code"}
          </button>
        </div>
      </form>
    </div>
  )
}
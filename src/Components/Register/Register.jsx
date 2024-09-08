import React, { useContext, useEffect, useState } from 'react'
import './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
 //integration with bE use axios and validation for form in fE use YUP (t3mli validation) , FORMIK
 //formik feha el initial values w lazm arbotha f el form bta3y 3n tare2 el value{formin.values.}
 //nbd2 nhandle el submit button 34an ya5od el data w yb3tha l backend w 3ayz el initial vales bta3t el formik lma aktb f el inputs el t7t y7slha update f el initial values w lma ydos 3la zorar el submit da y3ml fire llobject da w yb3t el initial values ll BE 
 //** el useFormik bta5od mni 3 7agat awl 7aga el initialValues tani 7aga el onSubmit( hn3ml refrence function w howa kda kda el formik hyb3tli el values k first parameter) talet 7aga el Validation **
 function Register() {

  const {setToken} = useContext(UserContext);

  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false)


//hrsm schema aw 4akl (matches yost5dm ll regex) , yup tsm7li m3 kol function mn dol aktb message lw 3ayz arg3 7aga ll user eno 8alt aw kda
const schema = Yup.object().shape({
  name: Yup.string().required('name is required').min(3 , 'not less than 3 chars').max(10, 'name not more than 10 chars'),
  email: Yup.string().required('email is required').email('email is not valid'),
  password: Yup.string().required(' password is required').matches(/^[A-Z].{5,}/ , 'password must contain capital letter and atleast 5 characters'),
  rePassword: Yup.string().required('confim your password').oneOf([Yup.ref('password')] , "doesn't match your password"),
  phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , 'phone must be a valid egyptian number')
})
const navigate = useNavigate();

 const formik = useFormik({
  // da object bl data el b7drha bykon nafs 4akl el data el fe el backend  3nd goz2 el signup
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    } ,
  //  el function el hb3thalo 34an y48lha lma y3ml submit ll form w dyman yb3tli el values bs b3d my7slha update mn el user

  //el onSubmit m4 hy48l el fuction de ela law el formik.errors {}
  onSubmit: handleSubmit,
  //formik 3ndo 7aga esmha validate ta5od function feha kol el ma4klw by48l el func de lw 7asl ay t3amol m3 el input aw submit ll form w fe el a5r ya5od el return bta3 el func w y7otha fe formik.errors
  //lazm ywsli el values mn el user 34an a2dr a3ml check 3leha b if cond aw 8ero 
   //h5li errors da obj fady w bona2n 3la cond mo3yn abd2 a3beh
  // validate: function(values) { 
  //   let errors = {};
  //   if (values.name == ''){
  //     errors.name = 'name is required'
  //   }
  //   else if(!/^[A-Z][a-z]{3,8}$/.test(values.name)){
  //     errors.name = "name must start with capital letter"
  //   }

  //   if(values.email == ''){
  //     errors.email = 'email is required'
  //   }

  //   return errors;
  // }
  //! Validation With YUP hrboto b 7aga esmha validdationSchema
  validationSchema: schema

   })

   //3yzen b2a nwdy el data ll backend 34an nt2kd en tmmam el email masln m4 mtkrr w kda hnst3ml axios
   async function handleSubmit(values){
    //kda hb3tlo el data f el body el data el heya el values
    setIsLoading(true)
    try{
      //h3ml destructing ll data atl3 el gowaha
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values)
      //lw el message kant success hbd2 ab3to 3la el home leh m4 el login? l2n ana m3aya token da bykon el id bta3 el user w el backend yrg3li el token da f el sign up fna m4 m7tag ab3to ll login ab3to ll home 3n tare2 hook mwgod f el router dom esmo useNavigate da byrg3li function f lw e7na sucess ha5leh y3mli navigate l saf7t el home el howa path fady y3ni
      if (data.message == "success"){
        navigate('/')
        setToken(data.token)

      }
    }
    catch(err){
      setErrMsg(err.response.data.message);
      console.log(err.response.data.message);
    }
    finally{
      setIsLoading(false)
    }
  
  }
  
  return (
    <div className='pt-28'>
      <h2 className='text-green-600'>Register</h2>
      {/* lw el acc mwgod aw ayn kan hy3rd el errMsg el heya 5aznaha f el useState */}
      {errMsg ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errMsg}
      </div> : null}

      
      
{/* y3mli prevent default el howa refresh bta3 el submit w yrbotli el form kolha bl formik*/}
<form className=" mt-4 mx-auto" onSubmit={formik.handleSubmit}>
<div className="relative z-0 w-full mb-5 group">
      <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>

      {formik.errors.name && formik.touched.name ?  <div
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
             {formik.errors.name}
             </div>
           </div> : null}

    </div>
  
  <div className="relative z-0 w-full mb-5 group">
  {/* {...formik.getFieldProps('email')}  de badl el value w el onChange w el onBlur */}
    <input type="email" name="email" id="email" {...formik.getFieldProps('email')}  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
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
           </div> : null}

  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>

    {formik.errors.password && formik.touched.password ?  <div
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
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>

    {formik.errors.rePassword && formik.touched.rePassword ?  <div
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
             {formik.errors.rePassword}
             </div>
           </div> : null}

  </div>
   
    <div className="relative z-0 w-full mb-5 group">
      <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>

      {formik.errors.phone && formik.touched.phone ?  <div
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
             {formik.errors.phone}
             </div>
           </div> : null}

    </div>

  <button disabled={isLoading} type="submit" className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">

    {isLoading? <FaSpinner className='animate-spin'/> : "Submit" }
    
    </button>
</form>

    </div>
  )
}
export default Register
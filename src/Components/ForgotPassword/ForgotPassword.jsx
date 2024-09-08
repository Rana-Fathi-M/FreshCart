import React, { useState } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    setErrMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email });

      if (response.data.statusMsg === 'success') {
        setSuccessMsg(response.data.message); // Show success message
        // Navigate to verification code page
        navigate('/verificationcode');
      } else {
        setErrMsg('An unexpected error occurred.'); // Handle other cases
      }
    } catch (error) {
      setErrMsg('Error occurred while sending reset code.'); // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-28">
      <h2 className="text-green-600">Forgot Password</h2>

      {errMsg && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {errMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          {successMsg}
        </div>
      )}

      <div className="mt-4 mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder="Enter your email"
        />

        <button
          disabled={isLoading}
          onClick={handleForgotPassword}
          className="mt-4 text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <FaSpinner className='animate-spin' /> : "Send Verification Code"}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;

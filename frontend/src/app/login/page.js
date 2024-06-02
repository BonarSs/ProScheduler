"use client";
import React, {useState} from 'react';
import Navbar from "../../../components/navbar";
import axios from 'axios';
import { useRouter } from 'next/navigation';


const LoginForm = () => {
  
  const router = useRouter()

  //Handler untuk Submit Form Login
  const submitLogin =  async (e) => {
    e.preventDefault()
    try {
      const response =  await axios.post('http://pro-scheduler-backend.vercel.app/user/LogIn', loginData, {withCredentials: true})
      setLoginData({
        email : '',
        password : ''
      })
      router.push('/dashboard')
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const [loginData, setLoginData] = useState({
    email : '',
    password : ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen mt-6 bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100">
        <form onSubmit={submitLogin} className="max-w-lg w-full sm:w-[480px] mx-auto flex flex-col border border-violet-200 p-12 bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100 shadow-2xl" style={{ borderRadius: '60px', fontFamily: 'Poppins', minWidth: '320px' }}>
          <img src="/images/biglogo.png" className="mx-auto h-13 w-auto" alt="Your Image" />
          <p className='text-center'>Log in to your account</p>
          <div className="mt-4">
            <label htmlFor="email" className="text-sm font-medium text-gray-900 block w-80 mx-auto">Email</label>
            <input type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5" placeholder="Email" required value={loginData.email} onChange={handleChange} />
          </div>
          <div className="mb">
            <label htmlFor="password" className="text-sm font-medium text-gray-900 block w-80 mx-auto">Password</label>
            <input type="password" id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5" placeholder="Password" required value={loginData.password} onChange={handleChange} />
          </div>
          <div className="flex justify-between mb-2">
            <div></div>
            <div className="text-sm" style={{ width: '160px' }}>
              <a href="#" className="block mb-2 text-blue-700 hover:underline">Forgot your password?</a>
            </div>
          </div>
          <button type="submit" className="text-white bg-violet-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm block w-80 mx-auto py-2.5 text-center" style={{ backgroundColor: '#48398F' }}>Log in</button>
          <p className='text-center mt-2 text-sm'>Don’t have an account?<a href="/register" className="text-blue-700 hover:underline"> Register Now</a></p>
        </form>
      </div>      
    </div>
  );
};

export default LoginForm;

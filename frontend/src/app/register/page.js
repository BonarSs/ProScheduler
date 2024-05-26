import React from 'react';
import Navbar from "../../../components/navbar";

const RegisterForm = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen mt-6 bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100">
        <form className="max-w-lg w-full sm:w-[480px] mx-auto flex flex-col border border-violet-200 p-12 bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100 shadow-2xl" style={{ borderRadius: '60px', fontFamily: 'Poppins', minWidth: '320px' }}>
          <img src="/images/biglogo.png" className="mx-auto h-13 w-auto" alt="Your Image" />
          <p className='text-center'>Register new account</p>
          <div className="mt-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-900 block w-80 mx-auto">Email</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5" placeholder="Email" required />
          </div>
          <div className="mt-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-900 block w-80 mx-auto">Username</label>
            <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5" placeholder="Username" required />
          </div>
          <div className="mt-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-900 block w-80 mx-auto">Password</label>
            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5" placeholder="Password" required />
          </div>
          <div className="mt-2">
            <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-900 block w-80 mx-auto">Password Confirmation</label>
            <input type="password" id="password_confirmation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5" placeholder="Password Confirmation" required />
          </div>
          <button type="submit" className="mt-6 text-white bg-violet-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm block w-80 mx-auto py-2.5 text-center" style={{ backgroundColor: '#48398F' }}>Create</button>
          <p className='text-center mt-2 text-sm'>Already have an account?<a href="/login" className="text-blue-700 hover:underline"> Login</a></p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

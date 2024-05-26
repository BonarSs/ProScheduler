"use client";

import Image from 'next/image';
import Navbar from '../../../components/navbar';
import SideBar from '../../../components/sidebar';

const ProfileForm = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="flex flex-grow justify-center items-center h-screen mt-6 bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100">
          <form className="max-w-lg w-full sm:w-[480px] mx-auto flex flex-col border border-violet-200 p-12 bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100 shadow-2xl" style={{ borderRadius: '60px', fontFamily: 'Poppins', minWidth: '320px' }}>
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
              <Image src="/images/profile.png" alt="User Avatar" width={80} height={96} />
            </div>
            <h2 className="text-lg font-semibold text-center mb-4">Bonbon Chocolat</h2>
            <div className="mt-4">
              <label htmlFor="email" className="text-sm font-medium text-gray-900 block w-80 mx-auto">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5" 
                placeholder="Email" 
                value="bonbon@example.com"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="username" className="text-sm font-medium text-gray-900 block w-80 mx-auto">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5" 
                placeholder="Username" 
                value="Bonbon Chocolat"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="text-sm font-medium text-gray-900 block w-80 mx-auto">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5" 
                placeholder="Password" 
                value="********"
              />
            </div>
            <button type="button" className="text-white bg-violet-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm block w-80 mx-auto py-2.5 text-center mt-4" style={{ backgroundColor: '#48398F' }}>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;

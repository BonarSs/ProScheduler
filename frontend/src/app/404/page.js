"use client";
import React from 'react';
import Navbar from '../../../components/navbar';

const Custom404 = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100">
        <div className="flex flex-col items-center p-12 bg-transparent" style={{ fontFamily: 'Poppins' }}>
          <img src="/images/404.png" className="mx-auto h-96 w-auto" alt="404 Page Not Found" />
        </div>
      </div>
    </div>
  );
};

export default Custom404;

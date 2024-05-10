"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function LoginRegisterPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData)
  };

  const resetForm = () => {
    setFormData({
      email : '',
      password : ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData)); // Menampilkan data form ke console dalam bentuk JSON
    resetForm()
    // try {
    //   const response = await axios.get("http://localhost:3000/status/CRUD")
    //   console.log(response)
    // } catch (error) {
    //   console.error(error)
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} // Menghubungkan nilai input dengan state formData
              onChange={handleChange} // Menangani perubahan input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} // Menghubungkan nilai input dengan state formData
              onChange={handleChange} // Menangani perubahan input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">{isRegistering ? 'Register' : 'Login'}</button>
        </form>
        <p className="mt-4">
          {isRegistering
            ? 'Already have an account?'
            : "Don't have an account?"}
          <button onClick={toggleForm} className="text-blue-500 ml-1 font-semibold focus:outline-none">
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}

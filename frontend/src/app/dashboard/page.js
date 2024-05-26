"use client";
import Head from 'next/head';
import Navbar from '../../../components/navbar';
import SideBar from '../../../components/sidebar';
import { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [dataProject, setDataProject] = useState(null);

  const loadDataProject = async (project_id) => {
    try {
      const response = await axios.get(`http://localhost:3000/project/${project_id}`, { withCredentials: true });
      setDataProject(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-[#F5F3FF]">
      <Head>
        <title>Dashboard</title>
      </Head>

      <Navbar />
      <div className="flex flex-1 mt-16 overflow-hidden"> {/* Tambahkan margin-top untuk memberi ruang di bawah navbar */}
        <SideBar loadProject={loadDataProject} />
        <main className="flex-1 p-4 overflow-auto ">
          <div className="flex justify-between items-center mb-4">
            <select className="border p-2 rounded">
              <option>Sprint 1</option>
            </select>
            <div className="flex space-x-4">
              <button className="p-2 rounded-full bg-gray-200">
                <img src="/images/share.png" alt="Share" className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-full bg-gray-200">
                <img src="/images/edit.png" alt="Edit" className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-full bg-gray-200">
                <img src="/images/chat.png" alt="Chat" className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex space-x-10 mb-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow">
                <div className="w-9 h-9 bg-purple-500 rounded-full"></div>
                {/* Hidden text */}
              </div>
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow">
                <div className="w-9 h-9 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-semibold opacity-0">UI/UX Designer 1</span> {/* Hidden text */}
              </div>
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow">
                <div className="w-9 h-9 bg-pink-500 rounded-full"></div>
                <span className="text-sm font-semibold opacity-0">Front end Programmer</span> {/* Hidden text */}
              </div>
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow">
                <div className="w-9 h-9 bg-cyan-500 rounded-full"></div>
                <span className="text-sm font-semibold opacity-0">UI/UX Designer 2</span> {/* Hidden text */}
              </div>
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow">
                <div className="w-9 h-9 bg-purple-300 rounded-full"></div>
                <span className="text-sm font-semibold opacity-0">Back end Programmer</span> {/* Hidden text */}
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-7 gap-4 mb-4">
                {[18, 19, 20, 21, 22, 23, 24].map(day => (
                  <div key={day} className="text-center">
                    {day}
                    <img src="/images/line.png" alt="Line" className="mx-auto mt-2 h-[260px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4 mt-2">
            <div className="text-lg font-semibold mb-4">TASK DISTRIBUTION CARDS</div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-lg p-12">
              </div>
              <div className="bg-white rounded-lg shadow-lg p-12">
              </div>
              <div className="bg-white rounded-lg shadow-lg p-12">
              </div>
              <div className="bg-white rounded-lg shadow-lg p-12">
              </div>
              <div className="bg-white rounded-lg shadow-lg p-12">
              </div>
              <div className="bg-white rounded-lg shadow-lg p-12">
              </div>
              <div className="bg-white rounded-lg shadow-lg p-12">
              </div>
              <div className="bg-white rounded-lg shadow-lg p-12">
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";
import Head from 'next/head';
import Navbar from '../../../components/navbar';
import SideBar from '../../../components/sidebar';
import { useState } from 'react';
import axios from 'axios';
import CreateProjectForm from '../../../components/createproject';
import TaskCard from '../../../components/taskcard';
import RoleCard from '../../../components/roleCard';
import NoProjectUI from '../../../components/noproject';

export default function Dashboard() {
  const [dataProject, setDataProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false)

  const loadDataProject = async (project_id) => {
    try {
      const response = await axios.get(`http://pro-scheduler-backend.vercel.app/project/${project_id}`, { withCredentials: true });
      setDataProject(response.data);
      console.log(dataProject)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //HandleFunction for AI Response
  const handleCreateButton = () =>{
    setIsCreating(!isCreating)
  }

  const closeForm = (e) => {
    if (e.currentTarget === e.target){
      setIsCreating(false)
    }
  }

  const submitAI = async (response) => {
      try {
        await setDataProject(response.data)
        handleCreateButton()
        console.log(dataProject)
      } catch (error) { 
        console.error(error)
      }
  }  

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-[#F5F3FF]">
      <Head>
        <title>Dashboard</title>
      </Head>

      <CreateProjectForm isCreating={isCreating} closoForm={closeForm} setResponse={submitAI}/>
      <Navbar />
      <div className="flex flex-1 mt-16"> {/* Tambahkan margin-top untuk memberi ruang di bawah navbar */}
        <SideBar loadProject={loadDataProject} Togglecreateform={handleCreateButton} dataProject={dataProject} />
        {dataProject ? 
        (
        <main className="flex-1 p-4 overflow-auto">
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
              {dataProject.task_id ?
              (dataProject.task_id.map(item => <RoleCard role={item.assigned_to} />)) : "" }
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
              {dataProject.task_id ?
              (dataProject.task_id.map(item => <TaskCard role={item.assigned_to} taskname={item.task} stardate={item.start_date ? item.start_date.substring(0,10) : null} enddate={item.end_date ? item.end_date.substring(0,10) : null} />)) : "" }
            </div>
          </div>
        </main>
        ) : 
        (
        <div className='flex items-center justify-center w-full'>
        <NoProjectUI />
        </div>
        )}
      </div>
    </div>
  );
}

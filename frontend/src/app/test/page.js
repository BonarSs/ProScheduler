"use client";
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
    {isCreating ? (<div className='flex justify-center w-full bg-gray-50'>
          <CreateProjectForm setResponse={submitAI} />
        </div>)
        : (<main className="flex-1 p-4 overflow-auto">
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
            {AIResponse ?
            (AIResponse.map(item => <RoleCard role={item.assigned_to}/>)) : "" }
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
          {AIResponse ?
           (AIResponse.map(item => <TaskCard role={item.assigned_to} taskname={item.task} stardate={item.start_date} enddate={item.end_date} />)) : "" }

          </div>
        </div>
      </main>)}
  );
}

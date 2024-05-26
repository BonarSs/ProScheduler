import React, { useState } from 'react';
import Navbar from './navbar';

export default function CreateProjectForm() {
  const [category, setCategory] = useState('app-development');

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-12">  
        <form className="max-w-lg w-full sm:w-[480px] mx-auto flex flex-col border border-violet-200 p-12 bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100 shadow-2xl" style={{ borderRadius: '60px', fontFamily: 'Poppins', minWidth: '320px' }}>
          <h1 className="text-center text-xl font-bold mb-4">Create your new project</h1>
          <div className="mt-2">
            <label htmlFor="title" className="text-sm font-semibold text-gray-900 block w-80 mx-auto">Project title</label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5"
              placeholder="Project title"
            />
          </div>
          <div className="mt-2">
            <label className="text-sm font-semibold text-gray-900 block w-80 mx-auto">Category</label>
            <div className="flex space-x-4 mt-1 w-80 mx-auto">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="category"
                  value="app-development"
                  checked={category === 'app-development'}
                  onChange={() => setCategory('app-development')}
                />
                <span className="font-semibold ml-2">App development</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="category"
                  value="event-project"
                  checked={category === 'event-project'}
                  onChange={() => setCategory('event-project')}
                />
                <span className="font-semibold ml-2">Event project</span>
              </label>
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="description" className="text-sm font-semibold text-gray-900 block w-80 mx-auto">Description</label>
            <textarea
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5"
              placeholder="Description"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="team-members" className="text-sm font-semibold text-gray-900 block w-80 mx-auto">Team members</label>
            <input
              type="text"
              id="team-members"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5"
              placeholder="Team members"
            />
          </div>
          <div className="mt-2 w-80 mx-auto">
            <div className="text-sm font-semibold text-gray-900 block mb-1">Date</div>
            <div className="flex space-x-4 mt-1">
              <div>
                <label htmlFor="start-date" className="text-sm font-semibold text-gray-900 block">Start</label>
                <input
                  type="date"
                  id="start-date"
                  className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 rounded-md shadow-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="text-sm font-semibold text-gray-900 block">End</label>
                <input
                  type="date"
                  id="end-date"
                  className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 rounded-md shadow-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="member-role" className="text-sm font-semibold text-gray-900 block w-80 mx-auto">Member role</label>
            <input
              type="text"
              id="member-role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-80 mx-auto p-1.5"
              placeholder="Member role"
            />
          </div>
          <button
            type="submit"
            className="mt-6 text-white bg-violet-700 focus:ring-4 focus:outline-none font-semibold rounded-lg text-sm block w-80 mx-auto py-2.5 text-center"
            style={{ backgroundColor: '#48398F' }}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

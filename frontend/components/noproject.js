import React, { useState } from 'react';
import CreateProjectForm from './createproject';
import Image from 'next/image';

const NoProjectUI = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreateButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-50">
      {showForm ? (
        <CreateProjectForm />
      ) : (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-8 bg-purple-100 rounded-full">
            <Image
              src="/images/cloud.png"
              alt="Cloud Icon"
              width={64}
              height={64}
            />
          </div>
          <p className="mb-4 text-xl font-medium text-gray-700">Oops.. there is no project here</p>
          <button
            onClick={handleCreateButtonClick}
            className="px-4 py-2 text-white bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg hover:from-blue-500 hover:to-purple-600"
          >
            Create one
          </button>
        </div>
      )}
    </div>
  );
};

export default NoProjectUI;

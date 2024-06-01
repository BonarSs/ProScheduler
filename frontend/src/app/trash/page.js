// components/Trash.js

import { FaSyncAlt, FaTrashAlt } from 'react-icons/fa';
import Navbar from '../../../components/navbar';
import SideBar from '../../../components/sidebar';

const Trash = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <Navbar />
        <div className="py-10 px-5 md:py-20 md:px-10 lg:py-24 lg:px-25 lg:my-5 lg:px-20">
          <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
            <div>
              <h3 className="text-lg font-semibold">Test 1</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet</p>
            </div>
            <div className="flex space-x-4">
              <FaSyncAlt className="text-purple-400 cursor-pointer text-2xl" />
              <FaTrashAlt className="text-purple-400 cursor-pointer text-2xl" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
            <div>
              <h3 className="text-lg font-semibold">Test 2</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet</p>
            </div>
            <div className="flex space-x-4">
              <FaSyncAlt className="text-purple-400 cursor-pointer text-2xl" />
              <FaTrashAlt className="text-purple-400 cursor-pointer text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trash;

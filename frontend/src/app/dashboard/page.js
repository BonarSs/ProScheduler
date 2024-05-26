import Head from 'next/head';
import Navbar from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-[#F5F3FF]">
      <Head>
        <title>Dashboard</title>
      </Head>
      
      <Navbar />
      <div className="flex flex-1 mt-16 overflow-hidden"> {/* Tambahkan margin-top untuk memberi ruang di bawah navbar */}
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <select className="border p-2 rounded">
              <option>Sprint 1</option>
              {/* Tambahkan opsi lain di sini */}
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
          <div className="flex space-x-4 mb-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow">
                <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-semibold">Project Manager</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-semibold">UI/UX Designer 1</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow">
                <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
                <span className="text-sm font-semibold">Front end Programmer</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow">
                <div className="w-8 h-8 bg-cyan-500 rounded-full"></div>
                <span className="text-sm font-semibold">UI/UX Designer 2</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow">
                <div className="w-8 h-8 bg-purple-300 rounded-full"></div>
                <span className="text-sm font-semibold">Back end Programmer</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-7 gap-4 mb-4">
                {[18, 19, 20, 21, 22, 23, 24].map(day => (
                  <div key={day} className="text-center">
                    {day}
                    <img src="/images/line.png" alt="Line" className="mx-auto mt-2 h-[240px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-4 mb-4 mt-20">
            <div className="w-1/4 bg-white rounded-lg shadow-lg p-20">
              <div className="text-center font-bold">BACK LOG</div>
            </div>
            <div className="w-1/4 bg-white rounded-lg shadow-lg p-20">
              <div className="text-center font-bold">IN PROGRESS</div>
            </div>
            <div className="w-1/4 bg-white rounded-lg shadow-lg p-20">
              <div className="text-center font-bold">REVISION</div>
            </div>
            <div className="w-1/4 bg-white rounded-lg shadow-lg p-20">
              <div className="text-center font-bold">DONE</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
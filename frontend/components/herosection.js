import React from "react";

export default function HeroSection() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white lg:px-20">
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 pt-20 lg:pt-8 lg:px-15 text-black">
        <h1 className="text-5xl font-bold mb-4" style={{ background: "-webkit-linear-gradient(320deg, rgba(42,128,240,1) 12%, rgba(254,78,238,1) 30%, rgba(72,57,143,1) 69%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: '1.2' }}>Step into the future of <br /> Project Management</h1>
        <p className="text-lg mb-8">
          Your Expert AI Companion for <span className="font-bold">Effortless Project</span> <br /> <span className="font-bold">Timeline Control</span>
        </p>
        <div>
        <a
  href="/knowmore"
  className="px-4 py-2 rounded hover:bg-blue-700 transition text-white rounded-lg"
  style={{
    background: "rgb(255,0,231)",
    backgroundImage: "linear-gradient(90deg, rgba(255,0,231,0.8) 24%, rgba(36,131,240,1) 100%, rgba(255,0,231,0.6) 100%)"
  }}
>
  Know More
</a>
        </div>
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8 lg:px-20">
        <img 
          src="/images/logolandingpage.png" 
          alt="Banner Image" 
          className="w-144 h-144 object-cover"
        />
      </div>
    </div>
  );
}

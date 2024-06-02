"use client"
import React, {useState, useEffect} from "react";

const getNextIndex = (() => {
    let index = 0;
    return () => index++;
  })();

export default function RoleCard({role, id}) {

    const cardColor = {
        0 : "bg-purple-500",
        1 : "bg-purple-300",
        2 : "bg-cyan-500",
        3 : "bg-pink-500",
        4 : "bg-blue-500"
    }
      const [randomColor, setRandomColor] = useState('');
    
    useEffect(() => {
        const currentIndex = getNextIndex();
        setRandomColor(cardColor[currentIndex % Object.keys(cardColor).length]);
      }, []);

    return(
        <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow">
            <div className={`w-9 h-9 ${randomColor} rounded-full`}></div>
            <span className="text-sm font-semibold">{role}</span>
        </div>
    )
}
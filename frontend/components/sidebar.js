"use client";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { IoRocketOutline } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { RxGear } from "react-icons/rx";
import { BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import SubMenuItem from "./submenuItem";
import axios from "axios";



export default function SideBar() {
    
    const [toggleCollapse, setToggleCollapse] = useState(true)
    const [project_data, setProjectData] = useState([])

   
    const fetchdata =  async () => {
        try {
            const response = await axios.get('http://localhost:3000/project', {withCredentials: true});
            setProjectData(response.data);    
        } catch (error) {
            console.error('Error fetching data:', error);

        }
    }

    useEffect(() => {
        fetchdata();
    },[])
    

    const handleDropDownClick = () =>{
        console.log("dropdown clicked")
    }
    
    const wrapperSideBar = classNames(
        "flex flex-col  h-screen bg-white border-r border-gray-200 shadow-2xl",
        {
            "w-80": toggleCollapse,
            "w-[90px]": !toggleCollapse
        })
    return (
        <div className={wrapperSideBar}>
            <div className="h-[70px]"></div>

            {/* Konten Sidebar */}
            <div className="flex justify-between flex-1 flex-col px-4 pt-8 pb-4">
                <div className="flex flex-col gap-y-2">
                    <div className="flex flex-col items-center gap-2 p-1 ">
                        {/* Title Menu */}
                        <div className="flex items-center gap-2 p-1 w-full hover:bg-violet-500 rounded-lg" onClick={() => {setToggleCollapse(!toggleCollapse)}} >
                                <IoRocketOutline className="h-full w-10"/>
                                <span className={classNames("text-lg font-medium text-black",{hidden: !toggleCollapse})}>
                                    Ongoing
                                </span> 
                        </div>    

                        {/* Sub-Menu */}
                        <div className={classNames("flex flex-col w-full max-h-[130px] pl-10 gap-1  ", {hidden : !toggleCollapse})}>
                            {project_data.map(item => (<SubMenuItem key={item._id} text={item.project_name} />))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-1 ">
                        {/* Title Menu */}
                        <div className="flex items-center gap-2 p-1 w-full hover:bg-violet-500 rounded-lg" onClick={() => {setToggleCollapse(!toggleCollapse)}} >
                                <BiTask className="h-full w-10"/>
                                <span className={classNames("text-lg font-medium text-black",{hidden: !toggleCollapse})}>
                                    Completed
                                </span> 
                        </div>    

                        {/* Sub-Menu */}
                        <div className={classNames("w-full max-h-[130px] pl-10 gap-y-2  ", {hidden : !toggleCollapse})}>

                        </div>
                    </div>

                    {/* <div className="flex items-center p-1 gap-2 hover:bg-violet-500 rounded-lg" onClick={() => {setToggleCollapse(!toggleCollapse)}}>
                        <BiTask className="h-full w-10"/>
                        <span className={classNames(" text-lg font-medium text-black",
                        {
                            hidden: !toggleCollapse
                        })}>
                            Completed
                        </span>
                    </div> */}

                </div>


                <div className="flex flex-col gap-y-2">
                    <div className="flex items-center p-2 gap-4 w-full hover:bg-slate-400 rounded-lg">
                        <RxGear className="h-full w-10"
                            onClick={() => {setToggleCollapse(!toggleCollapse)}}/>
                        <span className={classNames(" text-lg font-medium text-black",
                        {
                            hidden: !toggleCollapse
                        })}>
                            Settings
                        </span>
                    </div>
                    <div className="flex items-center p-2 gap-4 hover:bg-slate-400 rounded-lg">
                        <FaRegEdit className="translate-x-0.5 h-full w-10"
                            onClick={() => {setToggleCollapse(!toggleCollapse)}}/>
                        <span className={classNames(" text-lg font-medium text-black",
                        {
                            hidden: !toggleCollapse
                        })}>
                            Create New
                        </span>                        
                    </div>
                    <div className="flex items-center p-2 gap-4 hover:bg-slate-400 rounded-lg">
                        <BsTrash className="h-full w-10"
                            onClick={() => {setToggleCollapse(!toggleCollapse)}}/>
                        <span className={classNames(" text-lg font-medium text-black",
                        {
                            hidden: !toggleCollapse
                        })}>
                            Trash
                        </span>                        
                    </div>   
                </div>
            </div>
        </div>
    );
}
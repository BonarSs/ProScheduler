"use client";
import classNames from "classnames";
import { useState } from "react";
import { IoRocketOutline } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { RxGear } from "react-icons/rx";
import { BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";


export default function SideBar() {

    const [toggleCollapse, setToggleCollapse] = useState(true)

    const wrapperSideBar = classNames(
        "flex flex-col  h-screen bg-white",
        {
            "w-80": toggleCollapse,
            "w-20": !toggleCollapse
        })
    return (
        <div className={wrapperSideBar}>
            <div className="h-[70px]"></div>
            <div className="flex justify-between flex-1 flex-col px-4 pt-8 pb-4">
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-center pl-1 gap-4">
                        <IoRocketOutline className="h-full w-10"
                            onClick={() => {setToggleCollapse(!toggleCollapse)}}/>
                        <span className={classNames(" text-lg font-medium text-black",
                        {
                            hidden: !toggleCollapse
                        })}>
                            Ongoing
                        </span> 
                    </div>

                        {/* <div className="h-10 w-full bg-blue-300">

                        </div> */}

                    <div className="flex items-center pl-1 gap-4">
                        <BiTask className="h-full w-10"
                            onClick={() => {setToggleCollapse(!toggleCollapse)}}/>
                        <span className={classNames(" text-lg font-medium text-black",
                        {
                            hidden: !toggleCollapse
                        })}>
                            Completed
                        </span>
                    </div>

                    {/* <div className="pl-16 h-10 w-full bg-blue-300">
                        Test
                    </div> */}
                </div>


                <div className="flex flex-col gap-y-4">
                    <div className="flex items-center pl-1 gap-4">
                        <RxGear className="h-full w-10"
                            onClick={() => {setToggleCollapse(!toggleCollapse)}}/>
                        <span className={classNames(" text-lg font-medium text-black",
                        {
                            hidden: !toggleCollapse
                        })}>
                            Settings
                        </span>
                    </div>
                    <div className="flex items-center pl-1 gap-4">
                        <FaRegEdit className="translate-x-0.5 h-full w-10"
                            onClick={() => {setToggleCollapse(!toggleCollapse)}}/>
                        <span className={classNames(" text-lg font-medium text-black",
                        {
                            hidden: !toggleCollapse
                        })}>
                            Create New
                        </span>                        
                    </div>
                    <div className="flex items-center pl-1 gap-4">
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
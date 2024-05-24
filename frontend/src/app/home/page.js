"use client"
import axios from "axios";
import Navbar from "../../../components/navbar";
import SideBar from "../../../components/sidebar";
import { useState } from "react";

export default function HomePage() {
    const [dataProject, setDataProject] = useState()
    
    const loadDataProject = async (project_id) => {
        try {
            const response = await axios.get(`http://localhost:3000/project/${project_id}`, {withCredentials: true});
            setDataProject(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="flex flex-row">
                <SideBar loadProject = {loadDataProject}/>
                <div className="flex flex-row w-full pt-[70px] px-1">
                {JSON.stringify(dataProject)}
                </div>
            </div>
        </div>
    )
}
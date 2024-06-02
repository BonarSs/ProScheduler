"use client";
import axios from "axios";
import Navbar from "../../../components/navbar";
import SideBar from "../../../components/sidebar";
import { useState, useEffect } from "react";
import Head from 'next/head';
import NoProjectUI from "../../../components/noproject"; // Adjust the path if necessary

export default function HomePage() {
    const [dataProject, setDataProject] = useState(null);
    
    const loadDataProject = async (project_id) => {
        try {
            const response = await axios.get(`http://pro-scheduler-backend.vercel.app/project/${project_id}`, { withCredentials: true });
            setDataProject(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Load a project by default or handle initial state if needed
        // loadDataProject(some_default_project_id);
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <Head>
                <title>Project Dashboard</title>
            </Head>
            <Navbar />
            <div className="flex flex-row flex-1 overflow-hidden">
                <SideBar loadProject={loadDataProject} />
                <div className="flex flex-row flex-1 justify-center items-center">
                    {dataProject ? (
                        <div>{JSON.stringify(dataProject)}</div>
                    ) : (
                        <NoProjectUI />
                    )}
                </div>
            </div>
        </div>
    );
}

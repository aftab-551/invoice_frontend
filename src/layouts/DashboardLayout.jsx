// src/layouts/AdminLayout.jsx
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import Navbar from "@/components/dashboard/Navbar";
import SideBar from "@/components/dashboard/Sidebar";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // Outlet renders the matched child route component

const DashboardLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const windowWidth = useGetWindowWidth();

    return (
        <div className="flex h-screen bg-gray-50">
            {windowWidth >= 1024 ? (
                <SideBar />
            ) : (
                <MobileSidebar
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                />
            )}
            {/* Main Content Area */}
            <div className="w-full static bg-[#f6f8fb] overflow-auto px-5">
                <Navbar setShowSidebar={setShowSidebar} />
                <main>{<Outlet />}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;

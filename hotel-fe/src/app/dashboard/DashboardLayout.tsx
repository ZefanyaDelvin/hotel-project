"use client";

import { useState } from "react";
import DashboardFooter from "@/components/Footer/DashboardFooter";
import DashboardHeader from "@/components/Header/DashboardHeader";
import DashboardSidebar from "@/components/Sidebar/DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} />

      <div className="flex flex-col flex-1">
        {/* Header */}
        <DashboardHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>

        {/* Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;

"use client";

import { Icon } from "@iconify/react";

interface SidebarProps {
  isOpen: boolean;
}

const DashboardSidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={`bg-[#154D71] shadow-sm transition-all duration-300 text-white ${
        isOpen ? "w-55" : "w-20"
      } min-h-screen flex flex-col`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 mt-2">
        <Icon icon="mdi:view-dashboard-outline" width={28} />
      </div>

      {/* NavBar */}
      <nav className="flex-1 p-4 space-y-2">
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1C6EA4]"
        >
          <Icon icon="mdi:home-outline" width={22} />
          {isOpen && <span>Dashboard</span>}
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1C6EA4]"
        >
          <Icon icon="mdi:chart-line" width={22} />
          {isOpen && <span>Analytics</span>}
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1C6EA4]"
        >
          <Icon icon="mdi:cog-outline" width={22} />
          {isOpen && <span>Settings</span>}
        </a>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;

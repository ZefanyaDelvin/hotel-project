"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardHeader = ({ toggleSidebar }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-[#1C6EA4] border-b px-6 py-4 shadow-sm text-white relative">
      <div className="flex items-center gap-4">
        {/* Sidebar toggle */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-[#154D71] cursor-pointer"
        >
          <Icon icon="mdi:menu" width={24} />
        </button>

        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search or type command..."
            className="pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-blue-200 text-black"
          />
          <Icon
            icon="mdi:magnify"
            className="absolute left-3 top-2.5 text-gray-400"
            width={20}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 relative" ref={menuRef}>
        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-[#154D71] relative cursor-pointer">
          <Icon icon="mdi:bell-outline" width={22} />
        </button>

        {/* User Profile */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon icon="mdi:account-circle-outline" width="36" height="36" />
          <span className="font-medium hidden sm:block">Musharof</span>
          {menuOpen ? (
            <Icon
              icon="mdi:chevron-up"
              width={20}
              className="rotate-180 transition-all duration-300"
            />
          ) : (
            <Icon
              icon="mdi:chevron-down"
              width={20}
              className="transition-all duration-300"
            />
          )}
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 top-14 w-64 bg-white text-black rounded-xl shadow-lg p-4 z-50">
            {/* Profile Info */}
            <div className="mb-3">
              <h3 className="font-semibold text-gray-900">
                Musharof Chowdhury
              </h3>
              <p className="text-sm text-gray-500">randomuser@pimjo.com</p>
            </div>
            <div className="space-y-1">
              <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-left">
                <Icon icon="mdi:account-edit-outline" width={20} />
                Edit profile
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-left">
                <Icon icon="mdi:cog-outline" width={20} />
                Account settings
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-left">
                <Icon icon="mdi:information-outline" width={20} />
                Support
              </button>
            </div>
            <hr className="my-2" />
            <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-left text-red-600">
              <Icon icon="mdi:logout" width={20} />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;

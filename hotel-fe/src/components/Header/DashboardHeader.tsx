"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import logoutAction from "@/middleware/LogoutAction";

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

  const handleLogout = async () => {
    try {
      await logoutAction();
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("NEXT_REDIRECT")) {
          return;
        }
        console.error("Logout error:", err.message);
      } else {
        console.error("An unexpected error occurred during logout");
      }
    }
  };

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
            <button
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-left text-red-600 cursor-pointer"
              onClick={handleLogout}
            >
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

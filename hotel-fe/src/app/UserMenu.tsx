"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import logoutAction from "../middleware/LogoutAction";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutAction();
    } catch (err: unknown) {
      setIsLoggingOut(false);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      {/* Avatar button */}
      <button
        onClick={() => setOpen(!open)}
        className="border-2 border-transparent rounded-full p-2 hover:border-2 hover:border-gray-400 cursor-pointer"
        disabled={isLoggingOut}
      >
        <Icon icon="mdi:user" width="24" height="24" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600 cursor-pointer"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}

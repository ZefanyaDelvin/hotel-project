"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
}

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "mdi:home-outline",
  },
  {
    name: "Master",
    icon: "mdi:chart-line",
    children: [
      {
        path: "/dashboard/master/room",
        name: "Room",
        icon: "mdi:bed-outline",
      },
      {
        path: "/dashboard/master/user",
        name: "User",
        icon: "mdi:account-outline",
      },
      {
        path: "/dashboard/master/booking",
        name: "Booking",
        icon: "mdi:clipboard-list-outline",
      },
    ],
  },
];

const DashboardSidebar = ({ isOpen }: SidebarProps) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    routes.forEach((route) => {
      if (route.children) {
        const hasActiveChild = route.children.some(
          (child) => pathname.startsWith(child.path)
        );
        if (hasActiveChild) {
          setOpenMenus((prev) => ({ ...prev, [route.name]: true }));
        }
      }
    });
  }, [pathname]);

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
        {routes.map((route) =>
          route.children ? (
            <div key={route.name}>
              {/* Parent menu */}
              <button
                onClick={() => toggleMenu(route.name)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-[#1C6EA4] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Icon icon={route.icon} width={22} />
                  {isOpen && <span>{route.name}</span>}
                </div>
                {isOpen && (
                  <Icon
                    icon={
                      openMenus[route.name]
                        ? "mdi:chevron-up"
                        : "mdi:chevron-down"
                    }
                    width={20}
                  />
                )}
              </button>

              {/* Child menu */}
              <div
                className={`ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                  openMenus[route.name] && isOpen
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {route.children.map((child) => (
                  <Link
                    key={child.path}
                    href={child.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                      pathname === child.path
                        ? "bg-[#1C6EA4]"
                        : "hover:bg-[#1C6EA4]"
                    }`}
                  >
                    <Icon icon={child.icon} width={20} />
                    <span>{child.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div key={route.path}>
              <Link
                href={route.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                  pathname === route.path
                    ? "bg-[#1C6EA4]"
                    : "hover:bg-[#1C6EA4]"
                }`}
              >
                <Icon icon={route.icon} width={22} />
                {isOpen && <span>{route.name}</span>}
              </Link>
            </div>
          )
        )}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;

import LoginButton from "@/components/Button/LoginButton";
import RoomCard from "@/components/Card/RoomCard";
import { Icon } from "@iconify/react";
import { cookies } from "next/headers";
import Image from "next/image";
import HeroSection from "./HeroSection";

export default async function Home() {
  const cookieStore = await cookies();
  const isLogin = cookieStore.get("token");

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b bg-[#154D71] text-[#FFF9AF]">
        {/* Logo */}
        <h1 className="text-2xl font-bold">My Hotel</h1>

        {/* Nav Menu */}
        <ul className="flex space-x-6 text-[#FFF9AF] font-medium">
          <li>
            <a href="#">Our Room</a>
          </li>
          <li>
            <a href="#">About us</a>
          </li>
          <li>
            <a href="#">Contacts</a>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-6 text-[#FFF9AF] font-semibold">
          {isLogin ? (
            <button className="border rounded-full p-2">
              <Icon icon="mdi:user" width="24" height="24" />
            </button>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>

      {/* Body */}
      <HeroSection />
      <RoomCard />

      {/* Footer */}
      <div className="flex items-center justify-center bg-[#154D71]">
        <p className="text-[#FFF9AF]">
          &copy; 2023 My Hotel. All rights reserved.
        </p>
      </div>
    </>
  );
}

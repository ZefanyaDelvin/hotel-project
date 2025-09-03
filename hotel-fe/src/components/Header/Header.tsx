import UserMenu from "@/app/UserMenu";
import Link from "next/link";
import LoginButton from "../Button/LoginButton";
import { cookies } from "next/headers";

const Header = async() => {
  const cookieStore = await cookies();
  const isLogin = cookieStore.get("token") !== undefined || "";

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b bg-[#154D71] text-white">
        {/* Logo */}
        <h1 className="text-2xl font-bold">My Hotel</h1>

        {/* Nav Menu */}
        <ul className="flex space-x-6 text-white font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/room">Our Room</Link>
          </li>
          <li>
            <Link href="/about-us">About us</Link>
          </li>
          <li>
            <Link href="/contact-us">Contacts</Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-6 text-white font-semibold">
          {isLogin ? <UserMenu /> : <LoginButton />}
        </div>
      </div>
    </>
  );
};

export default Header;

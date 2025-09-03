"use client";

import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter()

  const onClick = () => {
    router.push("/login");
  };

  return (
    <button
      onClick={onClick}
      className="bg-[#1C6EA4] hover:bg-[#33A1E0] font-bold py-2 px-4 rounded-full text-white cursor-pointer"
    >
      Login
    </button>
  );
};

export default LoginButton;

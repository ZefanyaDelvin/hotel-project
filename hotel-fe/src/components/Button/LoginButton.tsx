"use client";

const LoginButton = () => {
  const onClick = () => {
    window.location.href = "/login";
  };

  return (
    <button
      onClick={onClick}
      className="bg-[#1C6EA4] hover:bg-[#33A1E0] font-bold py-2 px-4 rounded-full text-[#FFF9AF]"
    >
      Login
    </button>
  );
};

export default LoginButton;

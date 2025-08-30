"use client";

import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignUpData {
  userName: string;
  email: string;
  phoneNum: string;
  address: string;
  password: string;
  roleId: number;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  // Form state
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const data: SignUpData = {
    userName: username,
    email,
    phoneNum,
    address,
    password,
    roleId: 2,
  };

  const handleSignUp = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to create user");
      }

      router.push("/login");
      setIsError(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-[#154D71]">
          Create an Account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Fill in your details to sign up.
        </p>

        {/* Error Message */}
        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C6EA4] outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            E-Mail Address
          </label>
          <input
            type="email"
            placeholder="Enter your email..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C6EA4] outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C6EA4] outline-none"
            onChange={(e) => setPhoneNum(e.target.value)}
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter your address..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C6EA4] outline-none"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C6EA4] outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Sign up button */}
        <button
          className="w-full bg-[#154D71] text-white py-2 rounded-lg hover:bg-[#1C6EA4] transition"
          onClick={handleSignUp}
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#154D71] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

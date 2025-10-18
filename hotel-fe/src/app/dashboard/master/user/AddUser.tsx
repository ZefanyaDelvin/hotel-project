"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import z from "zod";

interface AddUser {
  userName: string;
  email: string;
  phoneNum: string;
  address: string;
  password: string;
  roleId: number;
}

interface AddUserProps {
  appAddUser: boolean;
  setAppAddUser: (value: boolean) => void;
  setAppUser: (value: boolean) => void;
  setIsSuccess: (value: boolean) => void;
}

const AddUser = ({
  appAddUser,
  setAppAddUser,
  setAppUser,
  setIsSuccess,
}: AddUserProps) => {
  const [requestData, setRequestData] = useState<AddUser>({
    userName: "",
    email: "",
    phoneNum: "",
    address: "",
    password: "",
    roleId: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Zod Validation Form
  const userSchema = z.object({
    userName: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    phoneNum: z
      .string()
      .min(10, "Phone must be minimal 10 digits")
      .max(13, "Max 10 digits")
      .regex(/^\d+$/, "Phone number must contain only digits"),
    address: z.string().min(1, "Address is required"),
    password: z
      .string()
      .regex(
        /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,16}$/,
        "Password must be 6–16 characters long, include at least one number and one special character"
      ),
    roleId: z.number().min(1, "Role is required"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({
      ...prev,
      [name]: name === "roleId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse(requestData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const messageParsed = JSON.parse(result.error.message);
      messageParsed.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      Swal.fire({
        icon: "success",
        title: "User Created",
        text: "The user has been created successfully!",
        confirmButtonColor: "#154D71",
      });

      setIsSuccess(true);
      setAppAddUser(false);
      setAppUser(true);
    } catch (err) {
      console.error("Error submitting user:", err);
    }
  };

  useEffect(() => {
    if (appAddUser) {
      setRequestData({
        userName: "",
        email: "",
        phoneNum: "",
        address: "",
        password: "",
        roleId: 0,
      });
    }
  }, [appAddUser]);

  return (
    <div
      className={`flex justify-center items-center ${
        appAddUser ? "block" : "hidden"
      }`}
    >
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* UserName */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="userName"
              value={requestData.userName}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.userName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#1c6ea4] focus:ring-[#154D71]"
              }`}
              required
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email"
              value={requestData.email}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#1c6ea4] focus:ring-[#154D71]"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phoneNum"
              value={requestData.phoneNum}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.phoneNum
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#1c6ea4] focus:ring-[#154D71]"
              }`}
              required
            />
            {errors.phoneNum && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNum}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={requestData.address}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.address
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#1c6ea4] focus:ring-[#154D71]"
              }`}
              required
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
              <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={requestData.password}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#1c6ea4] focus:ring-[#154D71]"
              }`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="roleId"
              value={requestData.roleId}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-md ${
                errors.roleId ? "border-red-500" : "border-[#1c6ea4]"
              }`}
            >
              <option value={0}>Select Role</option>
              <option value={1}>Admin</option>
              <option value={3}>Staff</option>
            </select>
            {errors.roleId && (
              <p className="text-red-500 text-sm mt-1">{errors.roleId}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setAppAddUser(false);
                setAppUser(true);
              }}
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              email="submit"
              className="px-4 py-2 bg-[#154D71] text-white rounded-md hover:bg-[#1C6EA4] cursor-pointer"
              onClick={handleSubmit}
            >
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { Icon } from "@iconify/react/dist/iconify.js";
import UserList from "./UserList";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

const User = () => {
  const [appUser, setAppUser] = useState(true);
  const [appAddUser, setAppAddUser] = useState(false);
  const [appEditUser, setAppEditUser] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, setIsSuccess]);

  return (
    <DashboardLayout>
      {isSuccess && (
        <div className="relative flex items-center gap-2 text-green-700 bg-green-100 p-4 rounded-xl border-2 border-green-300 mb-5">
          <Icon
            icon="material-symbols:check-circle"
            className="text-green-500 w-6 h-6"
          />

          <span className="font-medium">Success</span>

          <button
            className="absolute top-2 right-2 text-green-700 hover:text-red-500 cursor-pointer"
            onClick={() => setIsSuccess(false)}
          >
            <Icon icon="material-symbols:close" className="w-5 h-5" />
          </button>
        </div>
      )}
      <div className={`flex flex-col w-full ${appUser ? "block" : "hidden"}`}>
        <div className="mb-4 flex justify-end">
          <button
            className="bg-[#154D71] hover:bg-[#1c6ea4] text-white font-bold py-2 px-4 rounded transition cursor-pointer"
            onClick={() => {
              setAppAddUser(true);
              setAppUser(false);
            }}
          >
            Add User
          </button>
        </div>
        <UserList
          appUser={appUser}
          onEdit={(user) => {
            setSelectedUser(user);
            setAppEditUser(true);
            setAppUser(false);
          }}
          setIsSuccess={setIsSuccess}
        />
      </div>
      <AddUser
        appAddUser={appAddUser}
        setAppAddUser={setAppAddUser}
        setAppUser={setAppUser}
        setIsSuccess={setIsSuccess}
      />
      <EditUser
        appEditUser={appEditUser}
        setAppEditUser={setAppEditUser}
        setAppUser={setAppUser}
        setIsSuccess={setIsSuccess}
        selectedUser={selectedUser}
      />
    </DashboardLayout>
  );
};

export default User;

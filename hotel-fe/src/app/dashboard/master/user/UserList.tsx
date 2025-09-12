"use client";

import CustomTable from "@/components/Table/Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface User {
  userId: number;
  userName: string;
  email: string;
  phoneNum: string;
  address: string;
  roleId: number | string; // number from API, mapped to string later
}

interface UserListProps {
  appUser: boolean;
  onEdit: (user: User) => void;
  setIsSuccess: (value: boolean) => void;
}

const UserList = ({ appUser, onEdit, setIsSuccess }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [permitted, setPermitted] = useState(true);

  const columns = [
    { dataField: "userId", text: "User ID" },
    { dataField: "userName", text: "User Name" },
    { dataField: "email", text: "Email" },
    { dataField: "phoneNum", text: "Phone Number" },
    { dataField: "address", text: "Address" },
    { dataField: "roleId", text: "Role" },
  ];

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`
      );
      const data = await response.json();

      const roleMap: Record<number, string> = {
        1: "Admin",
        2: "Customer",
        3: "Staff",
      };

      const mappedData = data.map((user: any) => ({
        ...user,
        roleId: roleMap[user.roleId] || "Unknown",
        _originalRoleId: user.roleId,
        _canEditDelete: user.roleId !== 2, // 👈 only allow if not Customer
      }));

      setUsers(mappedData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (user: any) => {
    if (user._originalRoleId === 2) {
      setPermitted(false);
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#154D71",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/delete/${user.userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setUsers((prev) => prev.filter((u) => u.userId !== user.userId));

        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
          icon: "success",
          confirmButtonColor: "#154D71",
        });
        setIsSuccess(true);
      } else {
        console.error("Failed to delete user:", await response.text());
        Swal.fire("Error!", "Failed to delete the user.", "error");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const handleEdit = (user: any) => {
    if (user._originalRoleId === 2) {
      setPermitted(false);
      return;
    }
    onEdit(user);
  };

  useEffect(() => {
    if (appUser) {
      fetchUser();
    }
  }, [appUser]);

  return (
    <CustomTable
      columns={columns}
      data={users}
      showActions={permitted ? true : false}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default UserList;

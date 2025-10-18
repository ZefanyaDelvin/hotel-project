"use client";

import CustomTable from "@/components/Table/Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface User {
  userId: string;
  userName: string;
  email: string;
  phoneNum: string;
  address: string;
  roleId: number | string;
  _originalRoleId?: number;
}

interface UserListProps {
  appUser: boolean;
  onEdit: (user: User) => void;
  setIsSuccess: (value: boolean) => void;
}

const UserList = ({ appUser, onEdit, setIsSuccess }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const columns = [
    {
      dataField: "userId",
      text: "User ID",
      formatter: (value: string) => {
        const truncated = String(value).slice(0, 8) + "...";
        return <span title={value}>{truncated}</span>;
      },
    },
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
      }));

      setUsers(mappedData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Logic: Only roleId !== 2 (non-customers) can be edited/deleted
  const canModifyUser = (user: User) => {
    return user._originalRoleId !== 2;
  };

  const handleEdit = (user: User) => {
    onEdit(user);
  };

  const handleDelete = async (user: User) => {
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

  useEffect(() => {
    if (appUser) {
      fetchUser();
    }
  }, [appUser]);

  return (
    <CustomTable
      columns={columns}
      data={users}
      canEdit={true}
      canDelete={true}
      onEdit={handleEdit}
      onDelete={handleDelete}
      checkCanEdit={canModifyUser}
      checkCanDelete={canModifyUser}
      emptyMessage="No users found"
    />
  );
};

export default UserList;
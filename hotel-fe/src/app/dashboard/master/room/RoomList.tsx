"use client";

import CustomTable from "@/components/Table/Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Room {
  roomId: number;
  roomNumber: number;
  type: string;
  price: number;
  status: string;
  photoUrl: string | null;
  videoUrl?: string | null;
}

interface RoomListProps {
  appRoom: boolean;
  onEdit: (room: Room) => void;
  setIsSuccess: (value: boolean) => void;
}

const RoomList = ({ appRoom, onEdit, setIsSuccess }: RoomListProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const columns = [
    { dataField: "roomNumber", text: "Room Number" },
    { dataField: "type", text: "Type" },
    {
      dataField: "price",
      text: "Price",
      formatter: (value: number) => `$${value.toLocaleString()}`,
    },
    { dataField: "status", text: "Status" },
  ];

  const fetchRooms = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rooms`
      );
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleDelete = async (room: Room) => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/delete/${room.roomId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRooms((prev) => prev.filter((r) => r.roomId !== room.roomId));

        Swal.fire({
          title: "Deleted!",
          text: "The room has been deleted.",
          icon: "success",
          confirmButtonColor: "#154D71",
        });
        setIsSuccess(true);
      } else {
        console.error("Failed to delete room:", await response.text());
        Swal.fire("Error!", "Failed to delete the room.", "error");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  useEffect(() => {
    if (appRoom) {
      fetchRooms();
    }
  }, [appRoom]);

  return (
    <CustomTable
      columns={columns}
      data={rooms}
      canEdit={true}
      canDelete={true}
      onEdit={onEdit}
      onDelete={handleDelete}
      // No checkCanEdit/checkCanDelete = all rows can be edited/deleted
      emptyMessage="No rooms available"
    />
  );
};

export default RoomList;
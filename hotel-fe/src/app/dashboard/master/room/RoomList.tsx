"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

interface Room {
  roomId: number;
  roomNumber: number;
  type: string;
  price: number;
  status: string;
  photoUrl: string | null;
}

interface RoomListProps {
  appRoom: boolean; // 👈 receive from parent
}

const RoomList = ({ appRoom }: RoomListProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);

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

  useEffect(() => {
    if (appRoom) {
      fetchRooms();
    }
  }, [appRoom]);

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-[#154D71] text-white text-sm">
          <tr>
            <th className="py-3 px-6 text-left border-b">Room ID</th>
            <th className="py-3 px-6 text-left border-b">Room Number</th>
            <th className="py-3 px-6 text-left border-b">Type</th>
            <th className="py-3 px-6 text-left border-b">Price</th>
            <th className="py-3 px-6 text-left border-b">Status</th>
            <th className="py-3 px-6 text-center border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {rooms.map((room) => (
            <tr
              key={room.roomId}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-6 border-b">{room.roomId}</td>
              <td className="py-3 px-6 border-b">{room.roomNumber}</td>
              <td className="py-3 px-6 border-b">{room.type}</td>
              <td className="py-3 px-6 border-b">
                Rp {room.price.toLocaleString("id-ID")}
              </td>
              <td
                className={`py-3 px-6 border-b font-medium ${
                  room.status === "Available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {room.status}
              </td>
              <td className="py-3 px-6 border-b flex justify-center gap-2">
                {/* Edit button */}
                <button
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition cursor-pointer"
                  title="Edit"
                >
                  <Icon icon="material-symbols:edit" width={20} />
                </button>
                {/* Delete button */}
                <button
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition cursor-pointer"
                  title="Delete"
                >
                  <Icon icon="material-symbols:delete" width={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;

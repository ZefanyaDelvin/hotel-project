"use client";

import React, { useEffect, useState } from "react";
import Room1Image from "../../images/room1.jpeg";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

interface Room {
    roomId: number;
    type: string;
    price: number;
    status: string;
    photoUrl: string;
}

const RoomCard = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`);
        const roomResp = await res.json();
        setRooms(roomResp);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div
            key={room.roomId}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Image
              src={`http://localhost:8000${room.photoUrl}`}
              alt={room.type}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{room.type}</h3>
              <p className="text-gray-700">{room.price}</p>
              <p className="text-sm text-gray-500">
                Availability: {room.status ? "Yes" : "No"}
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2 text-gray-500">
                  <Icon icon="mdi:wifi" />
                  <Icon icon="mdi:television" />
                  <Icon icon="mdi:bathtub" />
                </div>
                <button className="bg-[#8B6B3F] text-white px-4 py-2 rounded hover:bg-[#6b4f2f]">
                  Book now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCard;

"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import RoomList from "./RoomList";
import AddRoom from "./AddRoom";
import { Icon } from "@iconify/react/dist/iconify.js";
import EditRoom from "./EditRoom";

const Room = () => {
  const [appRoom, setAppRoom] = useState(true);
  const [appAddRoom, setAppAddRoom] = useState(false);
  const [appEditRoom, setAppEditRoom] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

      return () => clearTimeout(timer)
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
      <div className={`flex flex-col w-full ${appRoom ? "block" : "hidden"}`}>
        <div className="mb-4 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition cursor-pointer"
            onClick={() => {
              setAppAddRoom(true);
              setAppRoom(false);
            }}
          >
            Add Room
          </button>
        </div>
        <RoomList
          appRoom={appRoom}
          onEdit={(room) => {
            setSelectedRoom(room);
            setAppEditRoom(true);
            setAppRoom(false);
          }}
          setIsSuccess={setIsSuccess}
        />
      </div>
      <AddRoom
        appAddRoom={appAddRoom}
        setAppAddRoom={setAppAddRoom}
        setAppRoom={setAppRoom}
        setIsSuccess={setIsSuccess}
      />
      <EditRoom
        appEditRoom={appEditRoom}
        setAppEditRoom={setAppEditRoom}
        setAppRoom={setAppRoom}
        setIsSuccess={setIsSuccess}
        selectedRoom={selectedRoom}
      />
    </DashboardLayout>
  );
};

export default Room;

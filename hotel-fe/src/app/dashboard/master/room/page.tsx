"use client";

import { useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import RoomList from "./RoomList";
import AddRoom from "./AddRoom";

const Room = () => {
  const [appRoom, setAppRoom] = useState(true);
  const [appAddRoom, setAppAddRoom] = useState(false);

  return (
    <DashboardLayout>
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
        <RoomList appRoom={appRoom} />
      </div>
      <AddRoom
        appAddRoom={appAddRoom}
        setAppAddRoom={setAppAddRoom}
        setAppRoom={setAppRoom}
      />
    </DashboardLayout>
  );
};

export default Room;

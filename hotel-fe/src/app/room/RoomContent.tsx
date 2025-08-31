"use client";

import RoomLandingPage from "./RoomLandingPage";
import RoomCard from "@/components/Card/RoomCard";
import { useRef } from "react";

const RoomContent = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white">
      {/* Landing Page */}
      <RoomLandingPage targetRef={cardRef} />

      {/* Get All Rooms */}
      <div ref={cardRef}>
        <RoomCard />
      </div>
    </div>
  );
};

export default RoomContent;

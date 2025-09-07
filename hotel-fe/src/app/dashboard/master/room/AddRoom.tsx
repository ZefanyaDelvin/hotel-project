"use client";

import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";

interface AddRoom {
  roomNumber: number;
  type: string;
  price: number;
  status: number;
  photoUrl: string;
  videoUrl: string;
}

interface AddRoomProps {
  appAddRoom: boolean;
  setAppAddRoom: (value: boolean) => void;
  setAppRoom: (value: boolean) => void;
}

const AddRoom = ({ appAddRoom, setAppAddRoom, setAppRoom }: AddRoomProps) => {
  const [formData, setFormData] = useState<AddRoom>({
    roomNumber: 0,
    type: "",
    price: 0,
    status: 1,
    photoUrl: "",
    videoUrl: "",
  });

  const [photos, setPhotos] = useState<FileList | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "roomNumber" || name === "price" || name === "status"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();

      formPayload.append("roomNumber", formData.roomNumber.toString());
      formPayload.append("type", formData.type);
      formPayload.append("price", formData.price.toString());
      formPayload.append("status", formData.status.toString());

      // Append multiple photos
      if (photos) {
        Array.from(photos).forEach((photo) => {
          formPayload.append("photo", photo);
        });
      }

      // Append video
      if (video) {
        formPayload.append("video", video);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/create`,
        {
          method: "POST",
          body: formPayload,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const result = await response.json();

      Swal.fire({
        icon: "success",
        title: "Room Created",
        text: "The room has been created successfully!",
        confirmButtonColor: "#154D71",
      });

      setAppAddRoom(false);
      setAppRoom(true);
    } catch (err) {
      console.error("Error submitting room:", err);
    }
  };

  return (
    <div
      className={`flex justify-center items-center ${
        appAddRoom ? "block" : "hidden"
      }`}
    >
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Room</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Room Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Number
            </label>
            <input
              type="number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-[#1c6ea4] focus:ring-[#154D71]"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g. Deluxe, Luxury"
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-[#1c6ea4] focus:ring-[#154D71]"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (Rp)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-[#1c6ea4] focus:ring-[#154D71]"
              required
            />
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Photos
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setPhotos(e.target.files)}
              className="mt-1 w-full border border-[#1c6ea4] rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#154D71] focus:border-[#154D71]"
              width={100}
              height={100}
            />
            {/* Preview photos */}
            {photos && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {Array.from(photos).map((file, index) => (
                  <Image
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-md border"
                    width={100}
                    height={100}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Video */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Video
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
              className="mt-1 w-full border border-[#1c6ea4] rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#154D71] focus:border-[#154D71]"
            />
            {/* Preview video */}
            {video && (
              <video
                controls
                className="mt-2 w-full max-h-64 rounded-md border"
                src={URL.createObjectURL(video)}
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setAppAddRoom(false);
                setAppRoom(true);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#154D71] text-white rounded-md hover:bg-[#1C6EA4]"
              onClick={handleSubmit}
            >
              Save Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;

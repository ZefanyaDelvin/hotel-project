"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface EditRoomData {
  roomId?: number;
  roomNumber: number;
  type: string;
  price: number;
  status: number | string;
  photoUrl: string;
  videoUrl: string;
}

interface EditRoomProps {
  appEditRoom: boolean;
  setAppEditRoom: (value: boolean) => void;
  setAppRoom: (value: boolean) => void;
  setIsSuccess: (value: boolean) => void;
  selectedRoom: EditRoomData | null;
}

const EditRoom = ({
  appEditRoom,
  setAppEditRoom,
  setAppRoom,
  setIsSuccess,
  selectedRoom,
}: EditRoomProps) => {
  const [formData, setFormData] = useState<EditRoomData>({
    roomNumber: 0,
    type: "",
    price: 0,
    status: 1,
    photoUrl: "",
    videoUrl: "",
  });
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  useEffect(() => {
    if (appEditRoom && selectedRoom) {
      setFormData({
        roomId: selectedRoom.roomId,
        roomNumber: selectedRoom.roomNumber,
        type: selectedRoom.type,
        price: selectedRoom.price,
        status: selectedRoom.status,
        photoUrl: selectedRoom.photoUrl || "",
        videoUrl: selectedRoom.videoUrl || "",
      });
      setPhotos(null);
      setVideo(null);
    }
  }, [appEditRoom, selectedRoom]);

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
      const form = new FormData();
      form.append("roomNumber", String(formData.roomNumber));
      form.append("type", formData.type);
      form.append("price", String(formData.price));
      form.append("status", String(formData.status));
      if (photos) {
        Array.from(photos).forEach((file) => {
          form.append("photo", file);
        });
      }
      if (video) {
        form.append("video", video);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/update/${formData.roomId}`,
        {
          method: "PUT",
          body: form,
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Room Updated",
          text: "The room has been updated successfully!",
          confirmButtonColor: "#154D71",
        });

        setIsSuccess(true);
        setAppEditRoom(false);
        setAppRoom(true);
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <>
      <div
        className={`flex justify-center items-center ${
          appEditRoom ? "block" : "hidden"
        }`}
      >
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Edit Room
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Room Number
              </label>
              <input
                type="number"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Photo
              </label>
              {formData.photoUrl && (
                <Image
                  src={formData.photoUrl}
                  alt="Current"
                  width={100}
                  height={100}
                  className="rounded-md border mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setPhotos(e.target.files)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Video
              </label>
              {formData.videoUrl && (
                <video
                  controls
                  className="mt-2 w-full max-h-64 rounded-md border"
                  src={formData.videoUrl}
                />
              )}
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files?.[0] || null)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
              {video && (
                <video
                  controls
                  className="mt-2 w-full max-h-64 rounded-md border"
                  src={URL.createObjectURL(video)}
                />
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setAppEditRoom(false);
                  setAppRoom(true);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#154D71] text-white rounded-md hover:bg-[#1C6EA4] cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditRoom;

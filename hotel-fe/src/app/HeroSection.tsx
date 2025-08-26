"use client";

import { Calendar, MapPin, User, Bed, Wifi, Coffee, Dumbbell, Car, Gamepad2, Sun, WashingMachine, Waves } from "lucide-react";
import Image from "next/image";
import Room1Image from "../images/room1.jpeg";

const HeroSection = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center px-8 py-12">
          {/* Left Side */}
          <div>
            <p className="italic text-yellow-600 text-lg mb-2">Paradise View</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hotel for every moment rich in emotion
            </h1>
            <p className="text-gray-600 mb-6">
              Every moment feels like the first time in paradise view
            </p>

            <div className="flex items-center gap-4">
              <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-yellow-700 transition">
                Book now
              </button>
              <button className="flex items-center gap-2 border px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">
                <span>Take a tour</span>
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div>
            <Image
              src={Room1Image}
              width={600}
              height={400}
              alt="Hotel view"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Booking Form */}
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl px-6 py-4 flex flex-wrap md:flex-nowrap items-center gap-4 -mt-10 relative z-10">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="text-yellow-600" />
            <span>Abuja</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Bed className="text-yellow-600" />
            <span>Standard</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <User className="text-yellow-600" />
            <span>01</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Calendar className="text-yellow-600" />
            <span>09 Mar 2023</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Calendar className="text-yellow-600" />
            <span>13 Mar 2023</span>
          </div>
          <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-700 transition">
            Book Now
          </button>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="bg-white py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Facilities
          </h1>
          <p className="text-gray-600 mt-2">
            We offer modern (5 star) hotel facilities for your comfort.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <Waves className="h-10 w-10 text-yellow-600 mx-auto" />, label: "Swimming Pool" },
            { icon: <Wifi className="h-10 w-10 text-yellow-600 mx-auto" />, label: "Wifi" },
            { icon: <Coffee className="h-10 w-10 text-yellow-600 mx-auto" />, label: "Breakfast" },
            { icon: <Dumbbell className="h-10 w-10 text-yellow-600 mx-auto" />, label: "Gym" },
            { icon: <Gamepad2 className="h-10 w-10 text-yellow-600 mx-auto" />, label: "Game Center" },
            { icon: <Sun className="h-10 w-10 text-yellow-600 mx-auto" />, label: "24/7 Light" },
            { icon: <WashingMachine className="h-10 w-10 text-yellow-600 mx-auto" />, label: "Laundry" },
            { icon: <Car className="h-10 w-10 text-yellow-600 mx-auto" />, label: "Parking Space" },
          ].map((facility, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
            >
              {facility.icon}
              <h3 className="mt-3 text-lg font-medium text-gray-800">
                {facility.label}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HeroSection;

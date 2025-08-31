"use client";

import Image from "next/image";
import myImage from "../../images/room1.jpeg";
import { Icon } from "@iconify/react/dist/iconify.js";

interface HeroSectionProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

const HeroSection = ({ targetRef }: HeroSectionProps) => {
  const handleClick = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[600px] w-full">
      {/* Background image */}
      <Image src={myImage} alt="" fill className="object-cover" priority />

      <div className="absolute inset-0 bg-black/40" />
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Rooms and Suites
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl">
          The elegant luxury bedrooms in this gallery showcase custom interior
          designs & decorating ideas. View pictures and find your perfect luxury
          bedroom design.
        </p>

        {/* Scroll Down Button */}
        <div className="mt-10 flex items-center justify-center">
          <button
            onClick={handleClick}
            className="w-12 h-12 flex items-center justify-center border-2 border-white rounded-full hover:bg-white hover:text-black transition cursor-pointer"
          >
            <Icon icon="formkit:arrowdown" width="9" height="16" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

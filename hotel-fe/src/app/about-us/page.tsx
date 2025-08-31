import MainLayout from "@/components/Layout/MainLayout";
import Image from "next/image";
import myImage from "../../images/room1.jpeg";

const AboutUs = () => {
  return (
    <>
      <MainLayout>
        {/* Landing Page */}
        <div className="bg-white">
          <section className="relative h-[600px] w-full">
            {/* Background image */}
            <Image
              src={myImage}
              alt=""
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-black/40" />
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl">
                The elegant luxury bedrooms in this gallery showcase custom
                interior designs & decorating ideas. View pictures and find your
                perfect luxury bedroom design.
              </p>
            </div>
          </section>
        </div>

        {/* Content */}
        <div className="bg-white py-12 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative">
                <Image
                  src={myImage}
                  alt="Manager"
                  className="w-80 h-auto rounded-lg shadow-lg"
                />
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-lg font-semibold">Name of the Hotel</h3>
                  <p className="text-gray-600">(Our Hotel)</p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="text-justify space-y-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quaerat natus est voluptates tempora, deserunt unde voluptas
                incidunt vel saepe possimus eaque repellat doloribus maxime eum
                soluta vero inventore aut ipsum.
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam, distinctio quo? Aperiam distinctio quasi cupiditate
                esse, incidunt dolores consequuntur, itaque excepturi molestiae
                nemo atque quam impedit, veritatis iusto maiores dicta.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
                cum ab blanditiis minus quos illum doloremque quia fugit
                commodi? Provident, maxime! Cupiditate dolorem harum vel
                commodi. Assumenda ullam quis ut. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Possimus atque dignissimos odio
                iusto blanditiis sit culpa voluptatem temporibus mollitia libero
                necessitatibus ipsam aliquam ad, repellendus aliquid error
                cumque qui ratione.
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default AboutUs;

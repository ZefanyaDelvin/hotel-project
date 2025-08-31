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
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Contact Us
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Excepturi impedit accusantium modi fuga assumenda dolore sunt
                aspernatur ex illo iusto!
              </p>
            </div>
          </section>
        </div>

        {/* Content */}
        <div className="bg-white py-12 px-4"></div>
      </MainLayout>
    </>
  );
};

export default AboutUs;

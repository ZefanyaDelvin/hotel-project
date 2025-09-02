import MainLayout from "@/components/Layout/MainLayout";
import Image from "next/image";
import myImage from "../../images/room1.jpeg";
import { Field, Input } from "@chakra-ui/react";

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
        <div className="bg-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Form */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fullname */}
              <div className="flex flex-col">
                <Field.Root required>
                  <Field.Label>
                    Email <Field.RequiredIndicator />
                  </Field.Label>
                  <Input placeholder="Enter your email" />
                  <Field.HelperText>
                    {"We'll never share your email."}
                  </Field.HelperText>
                </Field.Root>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-1 text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="johnbecker@gmail.com"
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message (full width) */}
              <div className="flex flex-col md:col-span-2">
                <label className="mb-1 text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  rows={6}
                  placeholder="message"
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Button (optional) */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </div>
            </form>

            {/* Map */}
            <div className="mt-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5745461168777!2d-99.16524212478863!3d19.348481744926568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce002ab8ff4f33%3A0xafe787c5a4956f3c!2sCoyoacan%20Market!5e0!3m2!1sen!2s!4v1696431977377!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default AboutUs;

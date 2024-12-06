import React from "react";
import Image from "next/image";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[100vh] w-full -mb-14 -mt-8">
        <Image
          src="/assets/images/hero-img.png"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-8">Contact Us</h1>
          <p className="text-md lg:text-xl px-10 md:px-12 lg:px-50 mb-2 text-center">
            Have questions or need assistance? Reach out to our <br /> support
            team anytime. We re here to help you resolve <br /> issues, anewer
            queries, and ensure you have the best <br /> experience possible.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-green-100 py-16 px-8 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nama Lengkap"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="pesan"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  rows={5}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tuliskan pesan anda disini"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold mb-6 text-center">
              Let’s talk with us
            </h2>
            <p className="text-gray-700 mb-8 text-center">
              Have questions or need assistance? Reach out to our support team
              anytime. We’re here to help you resolve issues, answer queries,
              and ensure you have the best experience possible.
            </p>

            {/* Social Media Icons */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Connect with us
              </h3>
              <div className="flex gap-6 justify-center lg:justify-start">
                <Link href="/contact">
                  <MailOutlineIcon className="w-10 h-10 flex items-center justify-center rounded-full" />
                </Link>

                <Link href="/contact">
                  <PhoneIcon className="w-10 h-10 flex items-center justify-center" />
                </Link>

                <Link href="/contact">
                  <TwitterIcon className="w-10 h-10 flex items-center justify-center" />
                </Link>

                <Link href="/contact">
                  <FacebookIcon className="w-10 h-10 flex items-center justify-center" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

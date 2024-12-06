import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <div className="bg-gray-50 text-gray-800">
        {/* About Us Section */}
        <section className="px-8 py-16 md:px-16 lg:px-24 bg-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 lg:pr-16">
              <h2 className="text-4xl font-bold mb-6">About Us</h2>
              <p className="text-base leading-relaxed text-justify">
                VillaRes adalah penyedia akomodasi yang mengutamakan vila-vila
                eksklusif di berbagai destinasi wisata di dunia. Dengan fokus
                pada kenyamanan dan pengalaman terbaik, kami selalu memberikan
                pelayanan terbaik untuk para tamu kami.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/assets/images/about-img.png"
                alt="Villa"
                width={400}
                height={400}
                quality={100}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Visi dan Misi Section */}
        <section className="px-8 py-16 md:px-16 lg:px-24 bg-green-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image
                src="/assets/images/visi-img.png"
                alt="Vision"
                width={400}
                height={400}
                quality={100}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-center">
                Visi dan Misi
              </h2>
              <h3 className="font-semibold text-lg mb-2">Visi</h3>
              <p className="text-base leading-relaxed text-justify">
                Menjadi penyedia akomodasi villa terkemuka di Indonesia yang
                dikenal karena keunggulan layanan, kenyamanan, dan komitmen
                terhadap keberlanjutan, serta menciptakan pengalaman liburan
                yang autentik dan berkesan bagi setiap tamu.
              </p>
              <h3 className="font-semibold text-lg mt-6 mb-2">Misi</h3>
              <p className="text-base leading-relaxed text-justify">
                Misi kami adalah menyediakan akomodasi villa yang berkualitas
                tinggi dengan pelayanan yang ramah, profesional, dan personal.
                Kami berkomitmen untuk memastikan kenyamanan dan keamanan tamu
                dalam setiap pengalaman menginap, serta mendukung keberlanjutan
                lingkungan melalui praktik operasional yang bertanggung jawab.
                Villaplace juga berusaha mempromosikan keindahan alam dan budaya
                lokal Indonesia, memungkinkan tamu untuk merasakan liburan yang
                autentik dan bermakna. Kami terus berinovasi agar Villaplace
                selalu menjadi pilihan utama bagi wisatawan yang mencari
                pengalaman menginap yang tak terlupakan di villa-villa terbaik
                Indonesia.
              </p>
            </div>
          </div>
        </section>

        {/* Keunggulan Section */}
        <section className="px-8 py-16 md:px-16 lg:px-24 bg-white">
          <div className="flex flex-col md:flex-row items-center text-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Keunggulan</h2>
              <ul className="list-disc list-inside text-base space-y-2">
                <li>Kebersihan</li>
                <li>Keamanan</li>
                <li>Kenyamanan</li>
                <li>Pelayanan Unggul</li>
                <li>Kualitas Terbaik</li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/assets/images/keunggulan-img.png" // Ubah dengan path gambar yang sesuai
                alt="Villa Features"
                width={400}
                height={400}
                quality={100}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Testimoni Section */}
        <section className="px-8 py-16 md:px-16 lg:px-24 bg-gray-100">
          <h2 className="text-4xl font-bold text-center mb-8">Testimoni</h2>
          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/assets/images/profile-default.png" // Ubah dengan path gambar yang sesuai
                  alt="John Doe"
                  width={400}
                  height={400}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-lg">John Doe</h3>
                  <p className="text-sm text-gray-500">4.0</p>
                </div>
              </div>
              <p className="text-base leading-relaxed">
                Sangat terbantu untuk mendapatkan vila yang nyaman bagi
                keluarga.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;

import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faLock,
  faStar,
  faTrophy,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about VillaRes",
};

const About = () => {
  return (
    <>
      <div className="bg-gray-50">
        {/* About Us Section */}
        <section className="px-8 py-16 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 lg:pr-16">
              <h2 className="text-4xl text-gray-800 font-bold mb-6">
                About Us
              </h2>
              <p className="text-base text-gray-700 font-semibold leading-relaxed text-justify">
                Villaplace adalah platform pemesanan villa eksklusif yang
                menghadirkan pengalaman menginap terbaik di berbagai destinasi
                wisata favorit. Kami berkomitmen untuk memberikan kenyamanan,
                pelayanan istimewa, dan kenangan tak terlupakan bagi setiap
                tamu. Dengan pilihan villa yang dirancang untuk memenuhi
                kebutuhan Anda, Villaplace siap menjadi mitra perjalanan yang
                selalu dapat diandalkan.
              </p>
            </div>
            <div className="md:w-1/2 shadow-2xl">
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
        <section className="px-8 py-16 md:px-16 lg:px-24 bg-[#089562]">
          <div className="flex flex-col md:flex-row items-center gap-8 text-white">
            <div className="md:w-1/2 shadow-2xl">
              <Image
                src="/assets/images/visi-img.png"
                alt="Vision"
                width={400}
                height={400}
                quality={100}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2 py-8">
              <h2 className="text-4xl font-bold mb-6 text-center">
                Visi dan Misi
              </h2>
              <h3 className="font-bold text-xl mb-2 text-white-700">Visi</h3>
              <p className="text-base leading-relaxed text-justify">
                Menjadi platform pemesanan villa terdepan di Indonesia, dikenal
                karena kualitas layanan, kenyamanan, dan dedikasi terhadap
                keberlanjutan. Kami bertujuan menciptakan pengalaman liburan
                autentik dan penuh kesan yang selalu diingat oleh tamu kami.
              </p>
              <h3 className="font-bold text-xl mt-6 mb-2 text-white-700">
                Misi
              </h3>
              <p className="text-base leading-relaxed text-justify">
                Kami berkomitmen untuk menyediakan akomodasi villa berkualitas
                tinggi dengan layanan yang ramah, profesional, dan personal,
                demi menciptakan pengalaman menginap yang nyaman dan aman bagi
                setiap tamu. Dengan mengutamakan keberlanjutan, kami menjalankan
                praktik operasional yang bertanggung jawab untuk melestarikan
                alam dan budaya lokal. Villaplace hadir untuk memperkenalkan
                keindahan alam dan kekayaan budaya Indonesia kepada dunia,
                memungkinkan tamu merasakan liburan yang autentik dan bermakna.
                Kami terus berinovasi untuk memastikan Villaplace menjadi
                pilihan utama wisatawan dalam mencari pengalaman menginap yang
                tak terlupakan di villa-villa terbaik Indonesia.
              </p>
            </div>
          </div>
        </section>

        {/* Keunggulan Section */}
        <section className="px-8 py-14 sm:py-16 md:px-16 lg:px-24 bg-gray-50">
          <div className="flex flex-col md:flex-row items-center text-left gap-8">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-10 lg:mb-20 sm:text-center">
                Keunggulan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 text-brown-500">
                    <FontAwesomeIcon icon={faBroom} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Kebersihan Terjamin
                    </h3>
                    <p className="text-gray-700">
                      Kami memastikan setiap villa selalu bersih dan higienis,
                      sehingga Anda merasa nyaman dan aman selama menginap.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 text-brown-500">
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Keamanan 24/7
                    </h3>
                    <p className="text-gray-700">
                      Semua villa dilengkapi dengan sistem keamanan yang bekerja
                      sepanjang waktu untuk melindungi Anda dan keluarga.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 text-brown-500">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Kenyamanan Maksimal
                    </h3>
                    <p className="text-gray-700">
                      Nikmati ruang yang luas, fasilitas lengkap, dan desain
                      interior yang dirancang untuk membuat Anda merasa seperti
                      di rumah.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 text-brown-500">
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Pelayanan Ramah dan Profesional
                    </h3>
                    <p className="text-gray-700">
                      Tim kami selalu siap membantu dengan sepenuh hati,
                      memastikan setiap kebutuhan Anda terpenuhi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 text-brown-500">
                    <FontAwesomeIcon icon={faTrophy} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Kualitas Terbaik
                    </h3>
                    <p className="text-gray-700">
                      Kami memilih villa dengan teliti, menghadirkan yang
                      terbaik untuk memenuhi harapan Anda.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 shadow-2xl">
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
        {/* <section className="px-8 py-16 md:px-16 lg:px-24 bg-gray-100">
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
        </section> */}
      </div>
    </>
  );
};

export default About;

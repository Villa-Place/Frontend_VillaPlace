import React from "react";
import Image from "next/image";

interface Image {
  url: string;
}
interface VillaImageProps {
  foto_villa: Image[];
  openModal: (index: number) => void;
}

const VillaImage = ({ foto_villa, openModal }: VillaImageProps) => {
  return (
    <div>
      <div>
        <Image
          src={foto_villa?.[0]?.url || "/assets/images/default-villa.jpg"}
          alt="Hero Image"
          className="w-full h-auto object-contain rounded-lg"
          onClick={() => {
            if (foto_villa.length > 0) {
              openModal(0);
            }
          }}
          onError={(e) =>
            (e.currentTarget.src = "/assets/images/default-villa.jpg")
          }
          loading="lazy"
          width={600}
          height={400}
        />
      </div>
      <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-hide">
        {foto_villa.slice(0, 4).map((foto: Image, index: number) => (
          <Image
            key={index}
            src={foto.url || "/assets/images/villa-gitah.png"}
            alt={`Villa Image ${index}`}
            onClick={() => openModal(index)}
            onError={(e) =>
              (e.currentTarget.src = "/assets/images/default-villa.png")
            }
            className={`w-20 h-20 bg-gray-100 rounded-lg object-cover `}
            loading="lazy"
            width={100}
            height={100}
          />
        ))}
        {foto_villa.length > 4 && (
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            +{foto_villa.length - 4} Lainnya
          </div>
        )}
      </div>
    </div>
  );
};

export default VillaImage;

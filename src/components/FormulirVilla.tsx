"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const VillaForm = () => {
  const [gallery, setGallery] = useState<string[]>([]);

  const handleGalleryUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const updatedGallery = [...gallery];
      for (let i = 0; i < files.length; i++) {
        updatedGallery.push(URL.createObjectURL(files[i]));
      }
      setGallery(updatedGallery);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white border shadow-xl rounded-md my-16">
      <h1 className="text-2xl font-bold mb-6 text-center">Formulir Villa</h1>

      <form>
        <div className="mb-4">
          <label htmlFor="villaName" className="block text-sm font-medium mb-2">
            Nama Villa
          </label>
          <input
            type="text"
            id="villaName"
            className="w-full border rounded p-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-2"
            >
              Lokasi
            </label>
            <input
              type="text"
              id="location"
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-2">
              Harga
            </label>
            <input
              type="text"
              id="price"
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Nomor Telepon
            </label>
            <input
              type="text"
              id="phone"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Fasilitas */}
          <div>
            <label
              htmlFor="facilities"
              className="block text-sm font-medium mb-2"
            >
              Jumlah Fasilitas
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Kamar"
                className="w-full border rounded p-2"
              />
              <input
                type="number"
                placeholder="Kamar mandi"
                className="w-full border rounded p-2"
              />
              <input
                type="number"
                placeholder="Orang"
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Deskripsi
          </label>
          <textarea
            id="description"
            className="w-full border rounded p-2"
          ></textarea>
        </div>

        {/* Upload Thumbnail */}
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-sm font-medium mb-2">
            Upload Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Kategori
          </label>
          <input
            type="text"
            id="category"
            className="w-full border rounded p-2"
          />
        </div>

        {/* Upload Gallery */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Galeri
          </label>
          <div className="flex space-x-4">
            {gallery.map((url, index) => (
              <div key={index} className="relative w-24 h-24">
                <Image
                  src={url}
                  alt={`Gallery image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ))}
            <label
              htmlFor="gallery-upload"
              className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 cursor-pointer rounded-md"
            >
              +
              <input
                id="gallery-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleGalleryUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </form>
      {/* Submit Button */}
      <div className="mt-6">
        <Link href="/">
          {" "}
          {/* Ganti aja nanti yaaa */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded"
          >
            Unggah
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VillaForm;

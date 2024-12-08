"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";

interface VillaFormData {
  nama: string;
  lokasi: string;
  harga: number;
  deskripsi: string;
  kategori: string[];
  foto_villa: File[];
  kamar: string;
  kamar_mandi: string;
}

const VillaForm = () => {
  const [formData, setFormData] = useState<VillaFormData>({
    nama: "",
    lokasi: "",
    harga: 0,
    deskripsi: "",
    kategori: [],
    foto_villa: [],
    kamar: "",
    kamar_mandi: "",
  });

  const [images, setImages] = useState<{ file: File; timestamp: number }[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "fasilitas" || name === "kategori") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "kategori"
  ) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) => ({
        file,
        timestamp: Date.now(),
      }));
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let fasilitas = [];
    fasilitas.push(
      "Kamar " + formData.kamar,
      "K. Mandi" + formData.kamar_mandi
    );

    try {
      // Create Villa
      const response = await axios.post(
        "http://localhost:8000/api/villa",
        {
          nama: formData.nama,
          lokasi: formData.lokasi,
          harga: formData.harga,
          fasilitas: fasilitas,
          deskripsi: formData.deskripsi,
          kategori: formData.kategori,
        },
        { withCredentials: true }
      );

      const villaData = response.data.data;
      const villaId = villaData._id;

      // Upload Images
      const imageFormData = new FormData();
      images.forEach((image) => {
        imageFormData.append("foto_villa", image.file);
      });

      await axios.post(
        `http://localhost:8000/api/villa/${villaId}/upload-villa`,
        imageFormData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Villa Created!",
        text: "Your villa has been successfully created.",
      }).then(() => {
        window.location.href = "/posting-mitra";
      });
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error Creating Villa",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white border shadow-xl rounded-md my-16">
      <h1 className="text-2xl font-bold mb-6 text-center">Formulir Villa</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="namaVilla" className="block text-sm font-medium mb-2">
            Nama Villa
          </label>
          <input
            type="text"
            name="nama"
            id="namaVilla"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="lokasi" className="block text-sm font-medium mb-2">
              Lokasi
            </label>
            <input
              type="text"
              name="lokasi"
              id="lokasi"
              value={formData.lokasi}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="harga" className="block text-sm font-medium mb-2">
              Harga
            </label>
            <input
              type="number"
              name="harga"
              id="harga"
              value={formData.harga}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Kamar</label>
            <input
              type="number"
              name="kamar"
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Kamar Mandi</label>
            <input
              type="number"
              name="kamar_mandi"
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="deskripsi" className="block text-sm font-medium mb-2">
            Deskripsi
          </label>
          <textarea
            name="deskripsi"
            id="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="kategori" className="block text-sm font-medium mb-2">
            Kategori (pisahkan dengan koma)
          </label>
          <input
            type="text"
            name="kategori"
            id="kategori"
            onChange={(e) => handleArrayChange(e, "kategori")}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Upload Galeri</label>
          <div className="flex space-x-4">
            {images.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <Image
                  src={URL.createObjectURL(img.file)}
                  alt={`Preview ${index + 1}`}
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
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                required
              />
            </label>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded"
          >
            Unggah
          </button>
        </div>
      </form>
    </div>
  );
};

export default VillaForm;

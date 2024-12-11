// !
"use client";
import React from "react";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";

interface VillaFormData {
  nama: string;
  lokasi: string;
  harga: number;
  deskripsi: string;
  kategori: string;
  foto_villa: File[];
  kamar: number;
  kamar_mandi: number;
  fasilitas: string[]; // Menambahkan fasilitas sebagai array string
}

const VillaForm = () => {
  const [images, setImages] = React.useState<
    { file: File; timestamp: number }[]
  >([]);
  const fasilitasOptions = [
    { value: "TV", label: "TV" },
    { value: "Parkir", label: "Parkir" },
    { value: "Kompor", label: "Kompor" },
    { value: "Kolam Renang", label: "Kolam Renang" },
    { value: "WIFI", label: "WIFI" },
    { value: "AC", label: "AC" },
    { value: "Air Panas", label: "Air Panas" },
    { value: "Kloset Duduk", label: "Kloset Duduk" },
    { value: "BBQ", label: "BBQ" },
  ];
  const formik = useFormik<VillaFormData>({
    initialValues: {
      nama: "",
      lokasi: "",
      harga: 0,
      deskripsi: "",
      kategori: "",
      foto_villa: [],
      kamar: 0,
      kamar_mandi: 0,
      fasilitas: [], // Menambahkan fasilitas kosong di awal
    },
    validationSchema: Yup.object({
      nama: Yup.string().required("Nama Villa harus diisi."),
      lokasi: Yup.string().required("Lokasi harus diisi."),
      harga: Yup.number()
        .required("Harga harus diisi.")
        .min(1, "Harga tidak boleh kurang dari 1."),
      deskripsi: Yup.string().required("Deskripsi harus diisi."),
      kategori: Yup.string().required("Kategori harus diisi."),
      kamar: Yup.number()
        .required("Jumlah kamar harus diisi.")
        .min(0, "Jumlah kamar tidak boleh kurang dari 0."),
      kamar_mandi: Yup.number()
        .required("Jumlah kamar mandi harus diisi.")
        .min(0, "Jumlah kamar mandi tidak boleh kurang dari 0."),
    }),
    onSubmit: async (values) => {
      // let fasilitas = [];
      // fasilitas.push(`Kamar ${values.kamar}`, `K. Mandi ${values.kamar_mandi}`);
      let fasilitas = [
        `Kamar ${values.kamar}`,
        `K. Mandi ${values.kamar_mandi}`,
        ...values.fasilitas, // Menambahkan fasilitas yang dipilih
      ];

      try {
        const response = await axios.post(
          "http://localhost:8000/api/villa",
          {
            nama: values.nama,
            lokasi: values.lokasi,
            harga: values.harga,
            fasilitas: fasilitas,
            deskripsi: values.deskripsi,
            kategori: values.kategori.split(",").map((item) => item.trim()),
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
          text: "Villa Berhasil Dibuat.",
        }).then(() => {
          window.location.href = "/posting-mitra";
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Gagal Membuat Villa",
          text: error.response?.data?.message || error.message,
        });
      }
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) => ({
        file,
        timestamp: Date.now(),
      }));
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white border shadow-xl rounded-md my-16">
      <h1 className="text-2xl font-bold mb-6 text-center">Formulir Villa</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nama" className="block text-sm font-medium mb-2">
            Nama Villa
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formik.values.nama}
            onChange={formik.handleChange}
            className="w-full border rounded p-2"
          />
          {formik.errors.nama && (
            <p className="text-red-500">{formik.errors.nama}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="lokasi" className="block text-sm font-medium mb-2">
              Lokasi
            </label>
            <input
              type="text"
              id="lokasi"
              name="lokasi"
              value={formik.values.lokasi}
              onChange={formik.handleChange}
              className="w-full border rounded p-2"
            />
            {formik.errors.lokasi && (
              <p className="text-red-500">{formik.errors.lokasi}</p>
            )}
          </div>
          <div>
            <label htmlFor="harga" className="block text-sm font-medium mb-2">
              Harga
            </label>
            <input
              type="number"
              id="harga"
              name="harga"
              value={formik.values.harga}
              onChange={formik.handleChange}
              className="w-full border rounded p-2"
              onWheel={(e) => e.currentTarget.blur()}
            />
            {formik.errors.harga && (
              <p className="text-red-500">{formik.errors.harga}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Kamar Tidur</label>
            <input
              type="number"
              name="kamar"
              value={formik.values.kamar}
              onChange={formik.handleChange}
              className="border rounded w-full p-2"
              min={0}
              onWheel={(e) => e.currentTarget.blur()}
            />
            {formik.errors.kamar && (
              <p className="text-red-500">{formik.errors.kamar}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Kamar Mandi</label>
            <input
              type="number"
              name="kamar_mandi"
              value={formik.values.kamar_mandi}
              onChange={formik.handleChange}
              className="border rounded w-full p-2"
              min={0}
              onWheel={(e) => e.currentTarget.blur()}
            />
            {formik.errors.kamar_mandi && (
              <p className="text-red-500">{formik.errors.kamar_mandi}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">
            Fasilitas Tambahan
          </label>
          <Select
            isMulti
            name="fasilitas"
            options={fasilitasOptions}
            value={fasilitasOptions.filter((option) =>
              formik.values.fasilitas.includes(option.value)
            )}
            onChange={(selectedOptions) => {
              formik.setFieldValue(
                "fasilitas",
                selectedOptions
                  ? selectedOptions.map((option: any) => option.value)
                  : []
              );
            }}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="deskripsi" className="block text-sm font-medium mb-2">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={formik.values.deskripsi}
            onChange={formik.handleChange}
            className="w-full border rounded p-2"
          ></textarea>
          {formik.errors.deskripsi && (
            <p className="text-red-500">{formik.errors.deskripsi}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="kategori" className="block text-sm font-medium mb-2">
            Kategori (pisahkan dengan koma)
          </label>
          <input
            type="text"
            id="kategori"
            name="kategori"
            value={formik.values.kategori}
            onChange={formik.handleChange}
            className="w-full border rounded p-2"
          />
          {formik.errors.kategori && (
            <p className="text-red-500">{formik.errors.kategori}</p>
          )}
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
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded"
          >
            {" "}
            Unggah
          </button>
        </div>
      </form>
    </div>
  );
};

export default VillaForm;

// ?

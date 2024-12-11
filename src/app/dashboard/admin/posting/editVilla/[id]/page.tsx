//!
"use client";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import Select from "react-select"; // Import react-select
import Image from "next/image";
interface Villa {
  nama: string;
  deskripsi: string;
  lokasi: string;
  kategori: string[];
  harga: number;
  kamar: number;
  kamar_mandi: number;
  foto_villa: { url: string; _id: string }[];
  fasilitas: [];
}

const VillaForm = () => {
  const { id } = useParams();
  const [images, setImages] = useState<{ file: File; timestamp: number }[]>([]);
  const validationSchema = Yup.object({
    nama: Yup.string().required("Nama Villa harus diisi."),
    lokasi: Yup.string().required("Lokasi harus diisi."),
    harga: Yup.number()
      .required("Harga harus diisi.")
      .min(1, "Harga tidak boleh kurang dari 1."),
    deskripsi: Yup.string().required("Deskripsi harus diisi."),
    kategori: Yup.array()
      .min(1, "Kategori harus diisi.")
      .of(Yup.string().required("Kategori harus diisi.")),
    kamar: Yup.number()
      .required("Jumlah kamar harus diisi.")
      .min(1, "Jumlah kamar tidak boleh kurang dari 1.")
      .typeError("Kamar harus diisi dengan angka."),
    kamar_mandi: Yup.number()
      .required("Jumlah kamar mandi harus diisi.")
      .min(1, "Jumlah kamar mandi tidak boleh kurang dari 1.")
      .typeError("Kamar Mandi harus diisi dengan angka."),
  });

  const [villa, setVilla] = useState<Villa>({
    nama: "",
    deskripsi: "",
    lokasi: "",
    kategori: [],
    harga: 0,
    kamar: 0,
    kamar_mandi: 0,
    foto_villa: [],
    fasilitas: [],
  });

  useEffect(() => {
    const getDataByID = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/villa/${id}`,
          { withCredentials: true }
        );
        const data = response.data.data;
        setVilla({
          ...data,
          kamar: parseInt(data.fasilitas[0].match(/\d+/)[0]), // Pastikan tipe number
          kamar_mandi: parseInt(data.fasilitas[1].match(/\d+/)[0]), // Pastikan tipe number
        });
      } catch (error) {
        console.error(error);
      }
    };

    getDataByID();
  }, [id]);

  const formik = useFormik({
    initialValues: villa,
    validationSchema: validationSchema,
    enableReinitialize: true, // This allows formik to reinitialize when the villa data is updated
    onSubmit: async (values) => {
      try {
        const updatedVilla = {
          ...values,
          fasilitas: [
            `Kamar ${values.kamar}`,
            `K. Mandi ${values.kamar_mandi}`,
            ...values.fasilitas,
          ],
        };

        const response = await axios.put(
          `http://localhost:8000/api/villa/${id}`,
          updatedVilla,
          { withCredentials: true }
        );
        const villaData = response.data.data;
        Swal.fire({
          icon: "success",
          title: "Villa Updated!",
          text: "Your villa has been successfully updated.",
        }).then(() => {
          window.location.href = "/dashboard/admin/posting";
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error Updating Villa",
          text: error.response?.data?.message || error.message,
        });
      }
    },
  });
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) => ({
        file,
        timestamp: Date.now(),
      }));
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };
  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "kategori"
  ) => {
    const value = e.target.value;
    formik.setFieldValue(
      field,
      value.split(",").map((item) => item.trim())
    );
  };

  const handleNumberChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "kamar" | "kamar_mandi"
  ) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 1) {
      formik.setFieldValue(field, value);
    } else {
      formik.setFieldValue(field, 0); // Set to 0 if value is invalid
    }
  };
  const handleMultipleSelectChange = (selectedOptions: any) => {
    formik.setFieldValue(
      "fasilitas",
      selectedOptions.map((option: any) => option.value)
    );
  };
  const handleReplaceImage = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const files = Array.from(e.target.files).map((file) => ({
        file,
        timestamp: Date.now(),
        photoId: villa.foto_villa[index]._id,
      }));

      const res = await axios.put(
        `http://localhost:8000/api/villa/${id}/edit-villa-images/${villa.foto_villa[index]._id}`,
        { foto_villa: files[0].file, photoId: files[0].photoId },
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setImages((prevImages) => [...prevImages, ...files]);

      // setVilla((prevVilla) => {
      //   const updatedFotoVilla = [...prevVilla.foto_villa];
      //   updatedFotoVilla[index] = {
      //     url: URL.createObjectURL(file),
      //     _id: villa.foto_villa[index]._id,
      //   };
      //   return { ...prevVilla, foto_villa: updatedFotoVilla };
      // });
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white border shadow-xl rounded-md my-16">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Edit Formulir Villa
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="namaVilla" className="block text-sm font-medium mb-2">
            Nama Villa
          </label>
          <input
            type="text"
            name="nama"
            id="namaVilla"
            value={formik.values.nama}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded p-2"
          />
          {formik.touched.nama && formik.errors.nama && (
            <div className="text-red-500 text-sm">{formik.errors.nama}</div>
          )}
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
              value={formik.values.lokasi}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded p-2"
            />
            {formik.touched.lokasi && formik.errors.lokasi && (
              <div className="text-red-500 text-sm">{formik.errors.lokasi}</div>
            )}
          </div>
          <div>
            <label htmlFor="harga" className="block text-sm font-medium mb-2">
              Harga
            </label>
            <input
              type="number"
              name="harga"
              id="harga"
              value={formik.values.harga}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded p-2"
            />
            {formik.touched.harga && formik.errors.harga && (
              <div className="text-red-500 text-sm">{formik.errors.harga}</div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Kamar</label>
            <input
              type="number"
              name="kamar"
              value={formik.values.kamar}
              onChange={(e) => handleNumberChange(e, "kamar")}
              onBlur={formik.handleBlur}
              className="border rounded w-full p-2"
            />
            {formik.touched.kamar && formik.errors.kamar && (
              <div className="text-red-500 text-sm">{formik.errors.kamar}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Kamar Mandi</label>
            <input
              type="number"
              name="kamar_mandi"
              value={formik.values.kamar_mandi}
              onChange={(e) => handleNumberChange(e, "kamar_mandi")}
              onBlur={formik.handleBlur}
              className="border rounded w-full p-2"
            />
            {formik.touched.kamar_mandi && formik.errors.kamar_mandi && (
              <div className="text-red-500 text-sm">
                {formik.errors.kamar_mandi}
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="fasilitas" className="block text-sm font-medium mb-2">
            Fasilitas Tambahan
          </label>
          <Select
            isMulti
            name="fasilitas"
            options={[
              { value: "TV", label: "TV" },
              { value: "Parkir", label: "Parkir" },
              { value: "Kompor", label: "Kompor" },
              { value: "Kolam Renang", label: "Kolam Renang" },
              { value: "WIFI", label: "WIFI" },
              { value: "AC", label: "AC" },
              { value: "Air Panas", label: "Air Panas" },
              { value: "Kloset Duduk", label: "Kloset Duduk" },
              { value: "BBQ", label: "BBQ" },
            ]}
            value={formik.values.fasilitas.map((fasilitas: string) => ({
              value: fasilitas,
              label: fasilitas,
            }))}
            onChange={handleMultipleSelectChange}
            className="w-full"
          />
          {formik.touched.fasilitas && formik.errors.fasiltas && (
            <div className="text-red-500 text-sm">
              {formik.errors.fasilitas}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="deskripsi" className="block text-sm font-medium mb-2">
            Deskripsi
          </label>
          <textarea
            name="deskripsi"
            id="deskripsi"
            value={formik.values.deskripsi}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded p-2"
          ></textarea>
          {formik.touched.deskripsi && formik.errors.deskripsi && (
            <div className="text-red-500 text-sm">
              {formik.errors.deskripsi}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="kategori" className="block text-sm font-medium mb-2">
            Kategori
          </label>
          <input
            type="text"
            name="kategori"
            id="kategori"
            value={formik.values.kategori.join(", ")}
            onChange={(e) => handleArrayChange(e, "kategori")}
            onBlur={formik.handleBlur}
            className="w-full border rounded p-2"
          />
          {formik.touched.kategori && formik.errors.kategori && (
            <div className="text-red-500 text-sm">{formik.errors.kategori}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Upload Galeri</label>
          <div className="flex space-x-4">
            {villa.foto_villa.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <Image
                  src={img.url}
                  alt={`Preview ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md cursor-pointer"
                  onClick={() =>
                    document.getElementById(`replace-image-${index}`)?.click()
                  }
                />
                <input
                  id={`replace-image-${index}`}
                  type="file"
                  onChange={(e) => handleReplaceImage(e, index)}
                  accept="image/*"
                  className="hidden"
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
              />
            </label>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded"
          >
            Update Villa
          </button>
        </div>
      </form>
    </div>
  );
};

export default VillaForm;

// types.ts
export interface FotoVilla {
    _id: string;
    villa: string;
    name: string;
    url: string;
    filepath: string;
    __v: number;
  }
  
  export interface VillaProps {
    _id: string;
    nama: string;
    deskripsi: string;
    lokasi: string;
    fasilitas: string[];
    harga: number;
    foto_villa: FotoVilla[];
    status: string;
    kategori: string[];
  }
  
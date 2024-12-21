import { User } from "../types/User";
import { VillaProps } from "../types/Villa";

export interface Ulasan {
  _id: string;
  komentar: string;
  rating: number;
  user: User;
  villa: VillaProps;
  pesanan: string;
}
export interface AddUlasan {
  komentar: string;
  rating: number;
  villa: string;
  pesanan: string;
}

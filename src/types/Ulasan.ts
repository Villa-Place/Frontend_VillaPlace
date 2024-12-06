import { User } from '../types/User';
import { VillaProps } from '../types/Villa';

export interface Ulasan {
  _id: string;
  komentar: string;
  rating: number;
  user: User;
  villa: VillaProps;
}
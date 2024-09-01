import { PrivredniSubjekt } from './privredni-subjekt';

export type Zaposleni = {
  id: number;
  imeIPrezime: string;
  email: string;
  brojTelefona: string;
  datumZaposlenja: Date;
  maticniBroj: number;
};

export type ApiResponse<T> = {
  message: string;
  data: T;
};

export type ZaposleniPopulated = Omit<Zaposleni, 'maticniBroj'> & {
  privredniSubjekt: PrivredniSubjekt;
};

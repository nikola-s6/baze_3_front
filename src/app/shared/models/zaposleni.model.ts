import {
  PrivredniSubjekt,
  PrivredniSubjektPopulated,
} from './privredni-subjekt';

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

export type ZaposleniWithPrivredniFull = Omit<
  ZaposleniPopulated,
  'maticniBroj'
> & {
  privredniSubjekt: PrivredniSubjektPopulated;
};

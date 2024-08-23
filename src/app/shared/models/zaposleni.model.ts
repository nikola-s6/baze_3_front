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

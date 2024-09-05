import { Kriterijum } from './kriterijum.model';
import { Ponuda } from './ponuda.model';
import {
  Zaposleni,
  ZaposleniPopulated,
  ZaposleniWithPrivredniFull,
} from './zaposleni.model';

export type JavniPozivFilters = {
  referentniBroj?: number;
  nazivPoziva?: string;
  datumIzdavanjaOd?: string;
  datumIzdavanjaDo?: string;
  datumZatvaranjaOd?: string;
  datumZatvaranjaDo?: string;
  procenjenaVrednostOd?: number;
  procenjenaVrednostDo?: number;
  privredniSubjekt?: number;
};

export type JavniPoziv = {
  referentniBroj: number;
  nazivPoziva: string;
  datumi: Datumi;
  procenjenaVrednost: number;
  oznakaValute: string;
  oznakaId: number;
  valutaId: number;
  zaposleniId: string;
};

export type Datumi = {
  datumIzdavanja: Date;
  datumZatvaranja: Date;
};

// no need to populate valuta since it is denormalized
export type JavniPozivPopulated = Omit<
  JavniPoziv,
  'oznakaId' | 'zaposleniId'
> & {
  zaposleni: Zaposleni;
  oznaka: Oznaka;
};

export type Oznaka = {
  broj: number;
  naziv: string;
};

export type GetAllJavniPozivDTO = Omit<JavniPozivPopulated, 'zaposleni'> & {
  zaposleni: Pick<
    ZaposleniPopulated,
    'imeIPrezime' | 'id' | 'privredniSubjekt'
  >;
};

type JavniPozivDetalji = {
  opis: string;
  dodatniPodaci: string;
  dozvoljeneVarijante: boolean;
  adresaDostavljanja: string;
  podlozanProduzenju: boolean;
  obrazlozenjeProduzenja?: string;
  osnovnaDelatnost: string;
};

export type JavniPozivDetails = Omit<GetAllJavniPozivDTO, 'zaposleni'> & {
  zaposleni: ZaposleniWithPrivredniFull;
} & JavniPozivDetalji & { ponude?: Ponuda[]; kriterijumi: Kriterijum[] };

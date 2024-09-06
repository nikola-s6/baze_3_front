import {
  ZaposleniPopulated,
  ZaposleniWithPrivredniFull,
} from './zaposleni.model';

export type Ponuda = {
  referentniBroj: number;
  datum: Date;
  ukljucujeProizvodjace: boolean;
  samostalna: boolean;
  izjavaOIntegritetu: boolean;
  cenaBezPdv: number;
  cenaSaPdv: number;
  valuta: Valuta;
  zaposleni: ZaposleniPopulated;
};
export type Valuta = {
  valutaId: number;
  nazivValute: string;
  oznakaValute: string;
};

export type PonudaFull = Omit<Ponuda, 'zaposleni'> & {
  zaposleni: ZaposleniWithPrivredniFull;
} & {
  ponudeKriterijuma?: Array<
    PonudaKriterijuma & {
      nazivJediniceMere?: string;
      oznakaJediniceMere?: string;
    }
  >;
};

export type PonudaKriterijuma = {
  referentniBrojPonude: number;
  kriterijumPozivaId: number;
  jedinicaMereId: number;
  vrednost: number;
  nazivKriterijumaPoziva: string;
};

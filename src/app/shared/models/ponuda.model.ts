import { ZaposleniPopulated } from './zaposleni.model';

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

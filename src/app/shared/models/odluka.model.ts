export type Odluka = {
  datumOdluke: Date;
  komisijaPrviClan: ClanKomisije;
  komisijaDrugiClan: ClanKomisije;
  komisijaTreciClan: ClanKomisije;
  referentniBrojJP: number;
  referentniBrojPonude: number;
};

type ClanKomisije = {
  zaposleniId: number;
  imeIPrezime: string;
  nazivPrivrdnogSubjekta: string;
};

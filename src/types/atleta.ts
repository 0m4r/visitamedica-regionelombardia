export interface Atleta {
  cognome: string;
  nome: string;
  luogoNascita: string;
  dataNascita: string;
  residenteA: string;
  cap: string;
  indirizzo: string;
  numeroCivico: string;
  codiceFiscale: string;
  indirizzoPec: string;
}

export interface SocietaInfo {
  societa: string;
  sede: string;
  cap: string;
  indirizzoPec: string;
  federazione: string;
  dal: string;
  codiceNumero: string;
  sport: string;
  primaAffiliazione: boolean;
  rinnovo: boolean;
  data?: string;
  logoSrc: string;
}

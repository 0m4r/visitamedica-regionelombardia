"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Atleta {
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

export default function Home() {
  const [atleti, setAtleti] = useState<Atleta[]>([]);
  useEffect(() => {
    const fetchAtleti = async () => {
      const response = await fetch("/api");
      if (response && !response.ok) {
        return "error";
      }
      const { atleti } = await response.json();
      setAtleti(atleti);
    };
    fetchAtleti();
  }, []);

  // Define a logoSrc variable or set a default value
  const logoSrc = "/logo.png"; // Replace with your actual logo path
  const data = "";
  const societa = "GRUPPO BASKET COLOGNO AL SERIO A.S.D.";
  const sede = "COLOGNO AL SERIO (BG)";
  const cap = "24055";
  const indirizzoPec = "basketcologno@pec.it";
  const federazione = "F.I.P - Federazione Italiana Pallacanestro";
  const dal = "01/07/1981";
  const codiceNumero = "007652";
  const sport = "PALLACANESTRO";
  const primaAffiliazione = false;
  const rinnovo = false;

  return atleti.map((atleta: Atleta) => (
    <div key={JSON.stringify(atleta)}>
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td colSpan={2} className="align-top text-left">
              <Image
                width={200}
                height={100}
                src={logoSrc}
                alt="Logo"
                className="w-1/5 border-0 text-left"
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="align-top text-right">
              DG WELFARE
              <br />
              U.O. PREVENZIONE
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="h-8"></td>
          </tr>
          <tr>
            <td
              colSpan={2}
              className="font-sans text-center align-middle uppercase"
            >
              <div className="mt-2 mb-2">
                <i>
                  RICHIESTA DI VISITA MEDICO-SPORTIVA PER L&apos;IDONEITÀ ALLA
                  PRATICA AGONISTICA
                </i>
              </div>
              <div>(D.M. SANITÀ 18.02.1982 – D.M. SANITÀ 04.03.1993)</div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="align-top text-right">
              Data {data || "___________________"}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div className="mt-2">
                La società sportiva <b>{societa}</b>
                <br />
                con sede in <b>{sede}</b> CAP <b>{cap}</b>
                <br />
                Indirizzo PEC<sup>*</sup>{" "}
                <b>
                  {indirizzoPec ||
                    "______________________________________________________"}
                </b>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <p className="text-center">Affiliata a:</p>
              Federazione Sportiva Nazionale (sigla): <b>{federazione}</b>
              <br />
              dal <b>{dal}</b> con codice numero <b>{codiceNumero}</b>
              <br />
              <br />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="align-middle text-center h-16">
              <span className="text-xl font-semibold">
                CHIEDE PER IL PROPRIO ATLETA
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="leading-6">
              Cognome e Nome
              <b>
                {" "}
                <span>{atleta.cognome}</span> <span>{atleta.nome}</span>
              </b>
              <br />
              nato a <b>{atleta.luogoNascita}</b> il <b>{atleta.dataNascita}</b>
              <br />
              Residente a <b>{atleta.residenteA}</b> CAP <b>{atleta.cap}</b>
              <br />
              Via/Piazza{" "}
              <b>
                {atleta.indirizzo}, {atleta.numeroCivico}
              </b>
              <br />
              Codice Fiscale N° <b>{atleta.codiceFiscale}</b>
              <br />
              Indirizzo PEC <b>{atleta.indirizzoPec}</b>
              <br />
              <br />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="text-center align-top">
              <div className="my-2">
                una visita medico-sportiva per l&apos;idoneità alla pratica
                agonistica dello sport:
                <br />
                <b className="text-xl">{sport}</b>
              </div>
            </td>
          </tr>
          <tr>
            <td className="align-top text-left w-1/2">
              <div className="relative pl-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={primaAffiliazione}
                  readOnly
                  className="border-2 border-black w-4 h-4 absolute top-0 left-0 accent-blue-600"
                />
                <label className="ml-2">Prima Affiliazione</label>
              </div>
            </td>
            <td className="align-top text-left w-1/2">
              <div className="relative pl-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rinnovo}
                  readOnly
                  className="border-2 border-black w-4 h-4 absolute top-0 left-0 accent-blue-600"
                />
                <label className="ml-2">
                  Rinnovo (allegare ultimo certificato in originale in possesso
                  dell&apos;atleta)
                </label>
              </div>
            </td>
          </tr>
          <tr className="h-36">
            <td className="align-middle text-left">
              Timbro Della Società sportiva
            </td>
            <td className="align-middle text-center">
              <i className="text-xs">(Firma del Presidente)</i>
              <br />
              _____________________________________________
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="text-[0.5em] text-justify">
              <br />
              <b>NB:</b>
              <br />
              L&apos;indirizzo PEC è requisito obbligatorio.
              <br />
              La mancata o errata compilazione di uno dei dati richiesti e/o la
              mancata presentazione dell&apos;ultimo certificato rende nulla la
              richiesta
              <br />
              Per prima affiliazione si intende la prima visita in assoluto
              dell&apos;atleta richiesta per qualsiasi sport, tutte le
              successive anche per sport diversi sono da considerarsi rinnovi.
              <br />
              La richiesta deve essere compilata a macchina o con carattere
              stampatello, timbrata e firmata in originale.
              <br />
              La richiesta non può essere presentata prima di 30 gg dalla
              scadenza del certificato precedente.
              <br />
              Il presidente della società non può compilare più richieste di
              visita per lo stesso atleta nel corso degli 11 mesi successivi.
            </td>
          </tr>
        </tbody>
      </table>
      <p className="break-after-page"></p>
    </div>
  ));
}

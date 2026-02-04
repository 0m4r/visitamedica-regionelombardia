import type { Atleta } from "@/types/atleta";

export type CsvRecord = Record<string, string>;

export function parseCSV(csv: string): CsvRecord[] {
  const rows = parseCSVRows(csv).filter((row) =>
    row.some((cell) => cell.trim() !== "")
  );

  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0].map((header) =>
    header.replace(/^\uFEFF/, "").trim()
  );

  return rows.slice(1).map((row) => {
    const obj: CsvRecord = {};
    headers.forEach((header, index) => {
      obj[header] = row[index]?.trim() || "";
    });
    return obj;
  });
}

export function mapRecordToAtleta(record: CsvRecord): Atleta {
  return {
    cognome: record.cognome || record.Cognome || "",
    nome: record.nome || record.Nome || "",
    luogoNascita:
      record.luogoNascita || record.LuogoNascita || record["luogo_nascita"] || "",
    dataNascita:
      record.dataNascita || record.DataNascita || record["data_nascita"] || "",
    residenteA:
      record.residenteA || record.ResidenteA || record["residente_a"] || "",
    cap: record.cap || record.Cap || record.CAP || "",
    indirizzo: record.indirizzo || record.Indirizzo || "",
    numeroCivico:
      record.numeroCivico || record.NumeroCivico || record["numero_civico"] || "",
    codiceFiscale:
      record.codiceFiscale ||
      record.CodiceFiscale ||
      record["codice_fiscale"] ||
      "",
    indirizzoPec:
      record.indirizzoPec || record.IndirizzoPec || record["indirizzo_pec"] || "",
  };
}

export function recordsToAtleti(records: CsvRecord[]): Atleta[] {
  return records.map(mapRecordToAtleta);
}

function parseCSVRows(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ",") {
      row.push(current);
      current = "";
      continue;
    }

    if (char === "\n" || char === "\r") {
      if (char === "\r" && input[i + 1] === "\n") {
        i += 1;
      }
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  row.push(current);
  rows.push(row);

  return rows;
}

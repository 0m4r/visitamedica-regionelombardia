import { promises as fs } from "fs";
import path from "path";
import type { Atleta } from "@/types/atleta";

/**
 * Parse CSV into array of objects
 * Handles basic CSV format - for complex CSVs with quoted fields, consider using papaparse
 */
export function parseCSV(csv: string): Record<string, string>[] {
  const [headerLine, ...lines] = csv.trim().split("\n");
  const headers = headerLine.split(",");


  return lines.map((line) => {
    const values = line.split(",");
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = values[i]?.trim() || "";
    });
    return obj;
  });
}

/**
 * Convert CSV record to Atleta object with proper type mapping
 */
function mapToAtleta(record: Record<string, string>): Atleta {
  return {
    cognome: record.cognome || record.Cognome || "",
    nome: record.nome || record.Nome || "",
    luogoNascita: record.luogoNascita || record.LuogoNascita || record["luogo_nascita"] || "",
    dataNascita: record.dataNascita || record.DataNascita || record["data_nascita"] || "",
    residenteA: record.residenteA || record.ResidenteA || record["residente_a"] || "",
    cap: record.cap || record.Cap || record.CAP || "",
    indirizzo: record.indirizzo || record.Indirizzo || "",
    numeroCivico: record.numeroCivico || record.NumeroCivico || record["numero_civico"] || "",
    codiceFiscale: record.codiceFiscale || record.CodiceFiscale || record["codice_fiscale"] || "",
    indirizzoPec: record.indirizzoPec || record.IndirizzoPec || record["indirizzo_pec"] || "",
  };
}

/**
 * Read and parse the athletes CSV file
 */
export async function getAtleti(): Promise<Atleta[]> {
  const filePath = path.join(process.cwd(), "public", "example.csv");
  const csvData = await fs.readFile(filePath, "utf-8");

  const records = parseCSV(csvData);
  return records.map(mapToAtleta);
}

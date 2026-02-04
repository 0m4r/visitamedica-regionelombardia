import { promises as fs } from "fs";
import path from "path";
import type { Atleta } from "@/types/atleta";
import { parseCSV, mapRecordToAtleta } from "@/lib/atleti-csv";

/**
 * Read and parse the athletes CSV file
 */
export async function getAtleti(): Promise<Atleta[]> {
  const filePath = path.join(process.cwd(), "public", "example.csv");
  const csvData = await fs.readFile(filePath, "utf-8");

  const records = parseCSV(csvData);
  return records.map(mapRecordToAtleta);
}

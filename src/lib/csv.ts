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
 * Read and parse the athletes CSV file
 */
export async function getAtleti(): Promise<Atleta[]> {
  const filePath = path.join(process.cwd(), "public", "example.csv");
  const csvData = await fs.readFile(filePath, "utf-8");
  return parseCSV(csvData) as Atleta[];
}

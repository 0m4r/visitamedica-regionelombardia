import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Helper to parse CSV into array of objects (basic, for simple CSVs)
function parseCSV(csv: string) {
  const [headerLine, ...lines] = csv.trim().split("\n");
  const headers = headerLine.split(",");
  return lines.map(line => {
    const values = line.split(",");
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = values[i]?.trim() || "";
    });
    return obj;
  });
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "example.csv");
    const csvData = await fs.readFile(filePath, "utf-8");
    const atleti = parseCSV(csvData);
    return NextResponse.json({ atleti });
  } catch (error) {
    console.error("Error reading CSV file:", error);
    return NextResponse.json({ error: "Failed to read CSV file" }, { status: 500 });
  }
}

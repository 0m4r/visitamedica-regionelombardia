import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest) {
  const response = await fetch(`${req.nextUrl.origin}/example.csv`)
  if (!response.ok) {
    return NextResponse.error()
  }
  const csvData = await response.text()
  const atleti = parseCSV(csvData);
  return NextResponse.json({ atleti });
}
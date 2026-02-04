"use client";

import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Atleta } from "@/types/atleta";
import { parseCSV, recordsToAtleti } from "@/lib/atleti-csv";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type AtletaField = keyof Atleta;

const atletaColumns: Array<{ key: AtletaField; label: string }> = [
  { key: "cognome", label: "Cognome" },
  { key: "nome", label: "Nome" },
  { key: "luogoNascita", label: "Luogo di nascita" },
  { key: "dataNascita", label: "Data di nascita" },
  { key: "residenteA", label: "Residente a" },
  { key: "cap", label: "CAP" },
  { key: "indirizzo", label: "Indirizzo" },
  { key: "numeroCivico", label: "Numero civico" },
  { key: "codiceFiscale", label: "Codice fiscale" },
  { key: "indirizzoPec", label: "Indirizzo PEC" },
];

const emptyAtleta: Atleta = {
  cognome: "",
  nome: "",
  luogoNascita: "",
  dataNascita: "",
  residenteA: "",
  cap: "",
  indirizzo: "",
  numeroCivico: "",
  codiceFiscale: "",
  indirizzoPec: "",
};

export function CsvEntry() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [csvText, setCsvText] = useState("");
  const [atleti, setAtleti] = useState<Atleta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [excludedRows, setExcludedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    localStorage.removeItem("atleti-data");
    const stored = sessionStorage.getItem("atleti-data");
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Atleta[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setAtleti(parsed);
        setExcludedRows(new Set());
        setError(null);
      }
    } catch {
      // Ignore invalid storage.
    }
  }, []);

  const loadCsvText = (text: string) => {
    if (!text.trim()) {
      setAtleti([]);
      setError("Inserisci un CSV valido per continuare.");
      setExcludedRows(new Set());
      return;
    }

    const records = parseCSV(text);
    const parsed = recordsToAtleti(records).filter((record) =>
      Object.values(record).some((value) => value.trim() !== "")
    );

    if (parsed.length === 0) {
      setAtleti([]);
      setError("Nessun atleta trovato. Controlla le intestazioni CSV.");
      setExcludedRows(new Set());
      return;
    }

    setAtleti(parsed);
    setExcludedRows(new Set());
    setError(null);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setCsvText(text);
    loadCsvText(text);
  };

  const handlePreview = () => {
    loadCsvText(csvText);
  };

  const handleReset = () => {
    setCsvText("");
    setAtleti([]);
    setError(null);
    setExcludedRows(new Set());
    sessionStorage.removeItem("atleti-data");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCellChange = (
    index: number,
    field: AtletaField,
    value: string
  ) => {
    setAtleti((prev) =>
      prev.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [field]: value } : row
      )
    );
  };

  const handleAddRow = () => {
    setAtleti((prev) => [...prev, { ...emptyAtleta }]);
  };

  const setRowIncluded = (index: number, included: boolean) => {
    setExcludedRows((prev) => {
      const next = new Set(prev);
      if (included) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleExport = () => {
    const exportRows = atleti.filter((_, index) => !excludedRows.has(index));
    if (exportRows.length === 0) return;
    const escapeCsv = (value: string) => {
      const safe = value ?? "";
      return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
    };

    const header = atletaColumns.map((column) => column.key).join(",");
    const rows = exportRows.map((row) =>
      atletaColumns.map((column) => escapeCsv(row[column.key] ?? "")).join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    const prefix = new Date().toISOString().replaceAll("-", "").replaceAll(":", "").split(".")[0];
    link.download = `${prefix}-atleti.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleGenerate = () => {
    const included = atleti.filter((_, index) => !excludedRows.has(index));
    if (included.length === 0) {
      setError("Seleziona almeno un atleta non escluso per generare i moduli.");
      return;
    }
    sessionStorage.setItem("atleti-data", JSON.stringify(included));
    router.push("/forms");
  };

  const includedCount = atleti.length - excludedRows.size;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">
          Generatore Richieste Visita Medico-Sportiva
        </h1>
        <p className="text-sm text-neutral-600 dark:text-zinc-400">
          Incolla o carica un CSV, verifica i dati e genera i moduli compilati.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Carica il CSV</CardTitle>
          <CardDescription>
            Intestazioni attese:{" "}
            {atletaColumns.map((column) => column.key).join(", ")}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <Label htmlFor="csv-file">File CSV</Label>
            <Input
              id="csv-file"
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="csv-text">Incolla CSV</Label>
            <Textarea
              id="csv-text"
              value={csvText}
              onChange={(event) => setCsvText(event.target.value)}
              placeholder="cognome,nome,luogoNascita,..."
            />
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={handlePreview}>
                Anteprima dati
              </Button>
              <Button type="button" variant="secondary" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
          {error ? (
            <p className="text-sm text-red-600" role="alert" aria-live="assertive">
              {error}
            </p>
          ) : (
            <p className="text-sm text-neutral-600" role="status" aria-live="polite">
              {atleti.length > 0
                ? `${atleti.length} atleti caricati.`
                : "Nessun dato caricato."}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Anteprima e modifica</CardTitle>
          <CardDescription>
            Aggiorna i campi prima di generare i moduli.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {atleti.length === 0 ? (
            <p className="text-sm text-neutral-600">
              Carica un CSV per visualizzare i dati.
            </p>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-neutral-600">
                  {includedCount} righe pronte
                  {excludedRows.size > 0 ? `, ${excludedRows.size} escluse.` : "."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" onClick={handleAddRow}>
                    Aggiungi atleta
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleExport}
                    disabled={includedCount === 0}
                  >
                    Esporta CSV
                  </Button>
                </div>
              </div>
              <div className="max-h-[60vh] overflow-auto rounded-md border border-neutral-200">
                <Table>
                  <caption className="sr-only">
                    Anteprima dati atleti da CSV
                  </caption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[90px]">Seleziona</TableHead>
                      {atletaColumns.map((column) => (
                        <TableHead key={column.key}>{column.label}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {atleti.map((row, index) => {
                      const isExcluded = excludedRows.has(index);
                      const rowLabel =
                        [row.cognome, row.nome].filter(Boolean).join(" ") ||
                        `riga ${index + 1}`;
                      return (
                        <TableRow
                          key={`${row.codiceFiscale}-${index}`}
                          className={
                            isExcluded
                              ? "bg-neutral-50 [&_input]:text-neutral-700 [&_input::placeholder]:text-neutral-400"
                              : undefined
                          }
                        >
                          <TableCell>
                            <div className="flex items-center">
                              <Checkbox
                                checked={!isExcluded}
                                onChange={(event) =>
                                  setRowIncluded(index, event.currentTarget.checked)
                                }
                                aria-label={
                                  isExcluded
                                    ? `${rowLabel} esclusa. Seleziona per includere`
                                    : `${rowLabel} inclusa. Deseleziona per escludere`
                                }
                              />
                              <span className="sr-only">
                                {isExcluded ? "Esclusa" : "Inclusa"}
                              </span>
                            </div>
                          </TableCell>
                          {atletaColumns.map((column) => (
                            <TableCell key={`${column.key}-${index}`}>
                              <Input
                                value={row[column.key] ?? ""}
                                onChange={(event) =>
                                  handleCellChange(
                                    index,
                                    column.key,
                                    event.target.value
                                  )
                                }
                                aria-label={`${column.label} (${rowLabel})`}
                                className="min-w-[10rem]"
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Genera moduli</CardTitle>
          <CardDescription>
            Usa i dati modificati per creare i moduli compilati.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={atleti.length === 0}
          >
            Vai ai moduli compilati
          </Button>
          <p className="text-xs text-neutral-500">
            I moduli si apriranno in una pagina dedicata.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

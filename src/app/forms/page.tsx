"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Atleta } from "@/types/atleta";
import { AtletaForm } from "@/components/atleta-form";
import { Button } from "@/components/ui/button";
import { societaInfo } from "@/lib/societa";

export default function FormsPage() {
  const router = useRouter();
  const [atleti, setAtleti] = useState<Atleta[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    localStorage.removeItem("atleti-data");
    const stored = sessionStorage.getItem("atleti-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Atleta[];
        if (Array.isArray(parsed)) {
          setAtleti(parsed);
        }
      } catch {
        setAtleti([]);
      }
    }
    setReady(true);
  }, []);

  const hasData = useMemo(() => atleti.length > 0, [atleti.length]);

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p className="text-sm text-neutral-600 dark:text-zinc-400">Caricamento dati...</p>
      </main>
    );
  }

  if (!hasData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-xl font-semibold">Nessun dato disponibile</h1>
        <p className="text-sm text-neutral-600">
          Torna alla pagina iniziale e carica un CSV.
        </p>
        <Button type="button" onClick={() => router.push("/")}>
          Torna all&apos;inserimento CSV
        </Button>
      </main>
    );
  }

  return (
    <main className="space-y-8 p-6">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Moduli compilati</h1>
          <p className="text-sm text-neutral-600 dark:text-zinc-400">
            {atleti.length} moduli pronti per la stampa.
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="secondary" onClick={() => router.push("/")}>
            Modifica CSV
          </Button>
          <Button type="button" variant="outline" onClick={() => window.print()}>
            Stampa
          </Button>
        </div>
      </div>

      <div className="space-y-8 overflow-clip wrap-anywhere">
        {atleti.map((atleta, index) => (
          <AtletaForm
            key={`${atleta.codiceFiscale}-${index}`}
            atleta={atleta}
            societaInfo={societaInfo}
            logoPreload={index === 0}
          />
        ))}
      </div>
    </main>
  );
}

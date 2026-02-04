"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-xl font-semibold">Si è verificato un errore.</h1>
      <p className="text-sm text-neutral-600 dark:text-zinc-400">
        Riprova oppure aggiorna la pagina.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded border border-black px-4 py-2 text-sm"
      >
        Riprova
      </button>
    </main>
  );
}

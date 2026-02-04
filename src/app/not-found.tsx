export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="text-xl font-semibold">Pagina non trovata</h1>
      <p className="text-sm text-neutral-600 dark:text-zinc-400">
        La risorsa richiesta non esiste.
      </p>
    </main>
  );
}

import { getAtleti } from "@/lib/csv";
import { AtletaForm } from "@/components/atleta-form";
import type { SocietaInfo } from "@/types/atleta";

// Static societa configuration
const societaInfo: SocietaInfo = {
  societa: "GRUPPO BASKET COLOGNO AL SERIO A.S.D.",
  sede: "COLOGNO AL SERIO (BG)",
  cap: "24055",
  indirizzoPec: "basketcologno@pec.it",
  federazione: "F.I.P - Federazione Italiana Pallacanestro",
  dal: "01/07/1981",
  codiceNumero: "007652",
  sport: "PALLACANESTRO",
  primaAffiliazione: false,
  rinnovo: false,
  logoSrc: "/logo.png",
};

export default async function Home() {
  const atleti = await getAtleti();

  if (!atleti || atleti.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">
          Nessun atleta trovato nel file CSV.
        </p>
      </main>
    );
  }

  return (
    <main>
      {atleti.map((atleta) => (
        <AtletaForm
          key={atleta.codiceFiscale}
          atleta={atleta}
          societaInfo={societaInfo}
        />
      ))}
    </main>
  );
}

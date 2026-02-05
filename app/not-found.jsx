import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h1>404</h1>
      <p>Oups… cette page n’existe pas 😕</p>

      <Link href="/">Retour à l’accueil</Link>
    </div>
  );
}

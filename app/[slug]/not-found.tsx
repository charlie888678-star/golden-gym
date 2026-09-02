import Link from "next/link";

export default function DemoNotFound() {
  return (
    <main className="demo-not-found">
      <p className="demo-not-found__eyebrow">404</p>
      <h1>Gym demo unavailable</h1>
      <p>This demo does not exist or is not currently published.</p>
      <Link href="/">View template preview</Link>
    </main>
  );
}

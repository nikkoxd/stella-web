import Link from "next/link";

export default function Config() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Server config</h1>
      <nav className="flex items-center gap-2">
        <Link href="#" className="underline">Main</Link>
        <Link href="#" className="underline">Welcoming</Link>
        <Link href="#" className="underline">Economy</Link>
        <Link href="#" className="underline">Experience</Link>
      </nav>
      <div>
        <p>Language</p>
        <p>Logging channel</p>
      </div>
    </main>
  )
}

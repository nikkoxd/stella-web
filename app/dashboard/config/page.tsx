export default function Config() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Server config</h1>
      <nav className="flex items-center gap-2">
        <a className="underline">Main</a>
        <a className="underline">Welcoming</a>
        <a className="underline">Economy</a>
        <a className="underline">Experience</a>
      </nav>
      <div>
        <p>Language</p>
        <p>Logging channel</p>
      </div>
    </main>
  )
}

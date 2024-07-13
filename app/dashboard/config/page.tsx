export default function Config() {
  return (
    <div className="min-h-screen">
      <header className="p-2 flex items-center justify-between border-b-2 border-current">
        <nav className="flex items-center gap-2">
          <p className="mr-4 font-bold">Stella Dashboard</p>
          <a className="underline" href="/dashboard/config">Server config</a>
        </nav>
        <a className="underline" href="/">Log out</a>
      </header>
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
    </div>
  )
}

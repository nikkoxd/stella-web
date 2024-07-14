import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-5 p-24">
      <h1 className="text-2xl font-bold">Панель управления</h1>
      <Link className="p-2 border-2 border-current rounded" href="/api/auth/discord/redirect">
        Войти через Discord
      </Link>
    </main>
  );
}

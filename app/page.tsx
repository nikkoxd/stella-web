export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-5 p-24">
      <h1 className="text-2xl font-bold">Панель управления</h1>
      <a className="p-2 border-2 border-current rounded" href="https://discord.com/oauth2/authorize?client_id=1119965914859843655&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify+guilds">
        Войти через Discord
      </a>
    </main>
  );
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) {
    redirect("/api/auth/discord/redirect");
  }

  await fetch("https://discord.com/api/users/@me", {
    headers: {
      "Authorization": `Bearer ${accessToken.value}`
    }
  }).then((response) => {
    if (!response.ok) {
      redirect("/api/auth/discord/redirect");
    }
  });

  return (
    <div className="min-h-screen">
      <header className="p-2 flex items-center justify-between border-b-2 border-current">
        <nav className="flex items-center gap-2">
          <p className="mr-4 font-bold">Stella Dashboard</p>
          <a className="underline" href="/dashboard/config">Server config</a>
        </nav>
        <a className="underline" href="/api/auth/discord/revoke">Log out</a>
      </header>

      {children}
    </div>
  )
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Guild } from "../types/guild";
import Image from "next/image";
import Link from "next/link";

async function getUserGuildsData(accessToken: string) {
  const response = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    redirect("/api/auth/discord/redirect");
  }
};

async function getUserData(accessToken: string) {
  const response = await fetch("https://discord.com/api/users/@me", {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })

  if (!response.ok) {
    redirect("/api/auth/discord/redirect");
  }
};

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

  const userData = await getUserData(accessToken.value);

  const userID = userData.id;
  const imageHash = userData.avatar;
  const imageURL = `https://cdn.discordapp.com/avatars/${userID}/${imageHash}.png`;

  const guildData = await getUserGuildsData(accessToken.value);

  const filteredGuildData = guildData.filter((guild: Guild) => {
    return guild.id == process.env.GUILD_ID;
  });

  const isAdmin = (filteredGuildData[0].permissions_new & 8) !== 0;

  return (
    <div className="min-h-screen">
      <header className="p-2 flex items-center justify-between border-b-2 border-current">
        <div className="flex items-center gap-2">
          <Image src="/stella.png" width={50} height={50} className="rounded-full" alt="Stella logo" />
          <div>
            <p className="mr-4 text-xl font-bold">Stella Dashboard</p>
            <nav className="flex items-center gap-2">
              <Link className="underline" href="/dashboard/config">Server config</Link>
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p>@{userData.username}</p>
            <Link className="underline" href="/api/auth/discord/revoke">Log out</Link>
          </div>
          <Image src={imageURL} width={50} height={50} className="rounded-full" alt="User avatar" />
        </div>
      </header>

      {isAdmin.toString()}

      {children}
    </div>
  )
}

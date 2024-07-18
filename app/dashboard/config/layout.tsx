import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import NoPermissions from "../no_permissions";
import { cookies } from "next/headers";
import { Guild } from "@/types/guild";

export default async function ConfigLayout({ children }: { children: React.ReactNode }) {
  async function getUserGuildsData(accessToken: string) {
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      if (response.status == 401 || response.status == 403 || response.status == 429) {
        console.log(response.status);
        redirect("/error/too_many_requests");
      }
      redirect("/api/auth/discord/redirect");
    }

    return response.json();
  };

  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) {
    redirect("/api/auth/discord/redirect");
  }

  const guildData = await getUserGuildsData(accessToken.value);

  const filteredGuildData = guildData.filter((guild: Guild) => {
    return guild.id == process.env.GUILD_ID;
  });

  // Check if user has Administrator permissions
  const isAdmin = (filteredGuildData[0].permissions_new & 8) !== 0;
  if (!isAdmin) return <NoPermissions />

  return (
    <>
      <h1 className="text-2xl font-bold">Конфиг сервера</h1>
      <nav className="mb-2 flex items-center gap-2 flex-wrap">
        <Link href="/dashboard/config/main" className="underline">Основное</Link>
        <Link href="/dashboard/config/welcome" className="underline">Приветствия</Link>
        <Link href="/dashboard/config/reactions" className="underline">Голосования</Link>
        <Link href="/dashboard/config/coins" className="underline">Экономика</Link>
        <Link href="/dashboard/config/exp" className="underline">Опыт</Link>
        <Link href="/dashboard/config/rooms" className="underline">VIP-Зал</Link>
      </nav>
      { children }
    </>
  )
}

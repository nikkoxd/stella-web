import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Guild } from "../../types/guild";
import NoPermissions from "../no_permissions";
import MainForm from "./mainForm";

export default async function Config() {
  async function getUserGuildsData(accessToken: string) {
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      if (response.status == 401 || response.status == 403 || response.status == 429) {
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
      <h1 className="text-2xl font-bold">Server config</h1>
      <nav className="flex items-center gap-2">
        <Link href="#" className="underline">Main</Link>
        <Link href="#" className="underline">Welcoming</Link>
        <Link href="#" className="underline">Economy</Link>
        <Link href="#" className="underline">Experience</Link>
      </nav>
      <MainForm />
    </>
  )
}

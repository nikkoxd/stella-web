import { Guild } from "@/types/guild";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NoPermissions from "../no_permissions";
import Message from "./message";

export default async function Generator() {
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
  const isAdmin = (filteredGuildData[0].permissions_new & 13) !== 0;
  if (!isAdmin) return <NoPermissions />

  return (
    <Message />
  );
}

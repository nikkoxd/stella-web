import { redirect } from "next/navigation";
import Link from "next/link"
import Image from "next/image"
import { cookies } from "next/headers";

export default async function Header() {
  async function getUserData(accessToken: string) {
    const response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      if (response.status == 401 || response.status == 403 || response.status == 429) {
        console.log(response.headers);
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

  const userData = await getUserData(accessToken.value);

  const userID = userData.id;
  const imageHash = userData.avatar;
  const imageURL = `https://cdn.discordapp.com/avatars/${userID}/${imageHash}.png`;

  return (
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
  );
};

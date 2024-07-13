import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
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
    redirect('/dashboard/config');
  });
}

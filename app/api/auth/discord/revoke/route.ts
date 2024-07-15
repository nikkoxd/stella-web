import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = cookies();

  const accessTokenCookie = cookieStore.get("access_token");

  if (accessTokenCookie) {
    await fetch("https://discord.com/api/oauth2/token/revoke", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        "client_id": process.env.CLIENT_ID as string,
        "client_secret": process.env.CLIENT_SECRET as string,
        "token": accessTokenCookie.value,
        "token_type_hint": "access_token"
      })
    }).then((response) => {
      if (response.ok) {
        cookieStore.delete("access_token");
        cookieStore.delete("refresh_token");
      }
    })
  }

  redirect("/");
}

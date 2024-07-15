import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

async function exchangeCode(code: string) {
  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      "client_id": process.env.CLIENT_ID as string,
      "client_secret": process.env.CLIENT_SECRET as string,
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": process.env.REDIRECT_URI as string,
    })
  });

  const data = await response.json();

  return data;
};

async function refreshToken(refreshToken: string) {
  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      "client_id": process.env.CLIENT_ID as string,
      "client_secret": process.env.CLIENT_SECRET as string,
      "grant_type": "refresh_token",
      "refresh_token": refreshToken,
    })
  });

  const data = await response.json();

  return data;
};

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const refreshTokenCookie = cookieStore.get("refresh_token");

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  let data;

  if (code) {
    data = await exchangeCode(code);
  } else if (refreshTokenCookie?.value) {
    data = await refreshToken(refreshTokenCookie.value);
  } else {
    redirect(process.env.OAUTH2_URI as string);
  }

  cookieStore.set("access_token", data.access_token, { secure: true });
  cookieStore.set("refresh_token", data.refresh_token, { secure: true });

  redirect("/dashboard");
}

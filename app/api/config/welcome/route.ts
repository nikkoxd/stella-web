import dbConnect from "@/lib/dbConnect";
import Guild from "@/models/Guild";

export async function POST(request: Request) {
  await dbConnect();

  const formData = await request.formData();

  const channelId = formData.get("channelId");
  const roleId = formData.get("roleId");

  const GUILD_ID = process.env.GUILD_ID!;

  try {
    const guild = await Guild.findOne({ id: GUILD_ID });
    await guild.updateOne({
      welcome: {
        channelId: channelId,
        roleId: roleId,
      }
    });
    return new Response('Guild updated', {
      status: 200
    })
  } catch (error) {
    return new Response('An error occured', {
      status: 500
    });
  }
}

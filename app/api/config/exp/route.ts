import dbConnect from "@/lib/dbConnect";
import Guild from "@/models/Guild";

export async function POST(request: Request) {
  await dbConnect();

  const formData = await request.formData();

  const cooldown = formData.get("cooldown");
  const min = formData.get("min");
  const max = formData.get("max");

  const GUILD_ID = process.env.GUILD_ID!;

  try {
    const guild = await Guild.findOne({ id: GUILD_ID });
    await guild.updateOne({
      exp: {
        cooldown: cooldown,
        min: min,
        max: max,
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

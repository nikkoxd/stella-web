import dbConnect from "@/lib/dbConnect";
import Guild from "@/models/Guild";

export async function POST(request: Request) {
  await dbConnect();

  const formData = await request.formData();

  const category = formData.get("category");
  const prefix = formData.get("prefix");
  const price = formData.get("price");

  const GUILD_ID = process.env.GUILD_ID!;

  try {
    const guild = await Guild.findOne({ id: GUILD_ID });
    await guild.updateOne({
      rooms: {
        category: category,
        prefix: prefix,
        price: price,
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

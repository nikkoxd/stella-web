import dbConnect from "@/lib/dbConnect";
import Guild from "@/models/Guild";

export async function POST(request: Request) {
  await dbConnect();

  const formData = await request.formData();

  const language = formData.get("language");
  const logChannel = formData.get("logChannel");
  const embedColor = formData.get("embedColor");
  const memberRoleId = formData.get("memberRoleId");

  const GUILD_ID = process.env.GUILD_ID!;

  console.log(language);
  console.log(logChannel);
  console.log(embedColor);
  console.log(memberRoleId);

  try {
    const guild = await Guild.findOne({ id: GUILD_ID });
    await guild.updateOne({
      language: language,
      logChannel: logChannel,
      embedColor: embedColor,
      memberRoleId: memberRoleId,
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

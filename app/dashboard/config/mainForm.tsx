import dbConnect from "@/lib/dbConnect";
import Guild, { IGuild } from "@/models/Guild";
import { headers } from "next/headers";

export default async function MainForm() {
  await dbConnect();

  const GUILD_ID = process.env.GUILD_ID!;
  let guild = await Guild.findOne({ id: GUILD_ID });

  async function updateConfig(formData: FormData) {
    "use server"

    const host = headers().get("host");
    const protocol = process?.env.NODE_ENV==="development"?"http":"https";

    const response = await fetch(`${protocol}://${host}/api/config`, {
      method: "POST",
      body: formData,
    });

    console.log(response.status);
  };

  return (
    <form className="w-1/2 space-y-2" action={updateConfig} >
      <div className="grid grid-cols-2 items-center">
        <label htmlFor="language">Language</label>
        <select className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" name="language" defaultValue={guild.language}>
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="logChannel">Log Channel ID</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="text" name="logChannel" defaultValue={guild.logChannel} />
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="embedColor">Embed Color</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="text" name="embedColor" defaultValue={guild.embedColor} />
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="memberRoleId">Member Role ID</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="text" name="memberRoleId" defaultValue={guild.memberRoleId} />
      </div>

      <button className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded" type="submit">Submit</button>
    </form>
  ) 
}

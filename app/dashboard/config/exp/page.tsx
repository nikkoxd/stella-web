import dbConnect from "@/lib/dbConnect";
import Guild, { IGuild } from "@/models/Guild";
import { headers } from "next/headers";

export default async function ExpForm() {
  await dbConnect();

  const GUILD_ID = process.env.GUILD_ID!;
  let guild = await Guild.findOne({ id: GUILD_ID });

  async function updateConfig(formData: FormData) {
    "use server"

    const host = headers().get("host");
    const protocol = process?.env.NODE_ENV==="development"?"http":"https";

    const response = await fetch(`${protocol}://${host}/api/config/exp`, {
      method: "POST",
      body: formData,
    });

    console.log(response.status);
  };

  return (
    <form className="lg:w-1/2 space-y-2" action={updateConfig} >
      <div className="grid grid-cols-2 items-center">
        <label htmlFor="cooldown">Время между наградами</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="text" name="cooldown" defaultValue={guild.exp.cooldown} />
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="min">Минимальная награда</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="number" name="min" defaultValue={guild.exp.min} />
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="max">Максимальная награда</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="number" name="max" defaultValue={guild.exp.max} />
      </div>

      <button className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded" type="submit">Submit</button>
    </form>
  ) 
}
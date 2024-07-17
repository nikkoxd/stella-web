import dbConnect from "@/lib/dbConnect";
import Guild, { IGuild } from "@/models/Guild";
import { headers } from "next/headers";

export default async function CoinsForm() {
  await dbConnect();

  const GUILD_ID = process.env.GUILD_ID!;
  let guild = await Guild.findOne({ id: GUILD_ID });

  async function updateConfig(formData: FormData) {
    "use server"

    const host = headers().get("host");
    const protocol = process?.env.NODE_ENV==="development"?"http":"https";

    const response = await fetch(`${protocol}://${host}/api/config/coins`, {
      method: "POST",
      body: formData,
    });

    console.log(response.status);
  };

  return (
    <form className="w-1/2 space-y-2" action={updateConfig} >
      <div className="grid grid-cols-2 items-center">
        <label htmlFor="cooldown">Cooldown</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="text" name="cooldown" defaultValue={guild.coins.cooldown} />
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="min">Minimum value</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="number" name="min" defaultValue={guild.coins.min} />
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="max">Maximum value</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="number" name="max" defaultValue={guild.coins.max} />
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="bumpReward">Bump reward</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="number" name="bumpReward" defaultValue={guild.coins.bumpReward} />
      </div>

      <button className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded" type="submit">Submit</button>
    </form>
  ) 
}

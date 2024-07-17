import dbConnect from "@/lib/dbConnect";
import Guild, { IGuild } from "@/models/Guild";
import { headers } from "next/headers";

export default async function RoomsForm() {
  await dbConnect();

  const GUILD_ID = process.env.GUILD_ID!;
  let guild = await Guild.findOne({ id: GUILD_ID });

  async function updateConfig(formData: FormData) {
    "use server"

    const host = headers().get("host");
    const protocol = process?.env.NODE_ENV==="development"?"http":"https";

    const response = await fetch(`${protocol}://${host}/api/config/rooms`, {
      method: "POST",
      body: formData,
    });

    console.log(response.status);
  };

  return (
    <form className="w-1/2 space-y-2" action={updateConfig} >
      <div className="grid grid-cols-2 items-center">
        <label htmlFor="category">Category</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="text" name="category" defaultValue={guild.rooms.category} />
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="prefix">Room name prefix</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="text" name="prefix" defaultValue={guild.rooms.prefix} />
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="price">Price per hour</label>
        <input className="px-2 py-1 bg-white dark:bg-black border border-gray-400 rounded" type="number" name="price" defaultValue={guild.rooms.price} />
      </div>

      <button className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded" type="submit">Submit</button>
    </form>
  ) 
}

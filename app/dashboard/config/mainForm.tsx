export default function MainForm() {
  return (
    <form className="w-1/2 space-y-2">
      <div className="grid grid-cols-2 items-center">
        <label htmlFor="language">Language</label>
        <select className="px-2 py-1 border border-gray-400 rounded" name="language">
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>
      <div className="grid grid-cols-2 items-center">
        <label htmlFor="logChannel">Log Channel ID</label>
        <input className="px-2 py-1 border border-gray-400 rounded" type="text" name="logChannel" />
      </div>
      <div className="grid grid-cols-2 items-center">
        <label htmlFor="memberRole">Member Role ID</label>
        <input className="px-2 py-1 border border-gray-400 rounded" type="text" name="memberRole" />
      </div>
      <div className="grid grid-cols-2 items-center">
        <label htmlFor="memberRole">Member Role ID</label>
        <input className="px-2 py-1 border border-gray-400 rounded" type="text" name="memberRole" />
      </div>
      <div className="grid grid-cols-2 items-center">
        <label htmlFor="reactionYes">Yes Reaction Emoji</label>
        <input className="px-2 py-1 border border-gray-400 rounded" type="text" name="reactionYes" />
      </div>
      <div className="grid grid-cols-2 items-center">
        <label htmlFor="reactionNo">No Reaction Emoji</label>
        <input className="px-2 py-1 border border-gray-400 rounded" type="text" name="reactionNo" />
      </div>
      <button className="px-2 py-1 bg-black text-white rounded" type="submit">Submit</button>
    </form>
  ) 
}

import Embed from "@/types/embed"

export interface EmbedProps extends Embed {
  index: number
  onDelete: (index: number) => void
}

export default function EmbedForm({ index, onDelete, author, body, images, footer, fields }: EmbedProps) {
  return (
    <div className="p-2 border border-current rounded">
      <div className="flex items-center gap-2">
        <p>Embed {index}</p>
        <button type="button" onClick={() => onDelete(index)} className="underline">Удалить</button>
      </div>

      <div className="space-y-2">
        <div className="author space-y-2">
          <p>Author</p>
          <input name="name" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Name" />
          <div className="grid grid-cols-2 gap-2">
            <input name="url" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="URL" />
            <input name="icon_url" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Icon URL" />
          </div>
        </div>

        <div className="body space-y-2">
          <p>Body</p>
          <input name="title" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Title" />
          <textarea name="description" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" placeholder="Description" />
          <div className="grid grid-cols-2 gap-2">
            <input name="url" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="URL" />
            <input name="color" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="color" />
          </div>
        </div>

        <div className="images space-y-2">
          <p>Images</p>
          <input name="image_url" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Image URL" />
          <input name="thumbnail_url" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Thumbnail URL" />
        </div>

        <div className="footer space-y-2">
          <p>Footer</p>
          <input name="text" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Text" />
          <div className="grid grid-cols-2 gap-2">
            <input name="icon_url" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Icon URL" />
            <input name="timestamp" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="date" placeholder="Timestamp" />
          </div>
        </div>

        <div className="fields space-y-2">
          <p>Fields</p>
          <div className="field space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input name="name" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Name" />
              <div>
                <input name="inline" type="checkbox" />
                <label htmlFor="inline">Inline?</label>
              </div>
            </div>
            <input name="value" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Value" />
          </div>
        </div>
      </div>
    </div>
  )
}

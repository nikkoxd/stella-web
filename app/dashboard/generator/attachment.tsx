export interface AttachmentProps {
  index: number,
  onDelete: (index: number) => void,
  url: string,
}

export default function AttachmentForm({ index, onDelete, url }: AttachmentProps) {
  return (
    <div className="p-2 border border-current rounded">
      <div className="flex items-center gap-2">
        <p>Attachment {index}</p>
        <button type="button" onClick={() => onDelete(index)} className="underline">Удалить</button>
      </div>

      <input name="url" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Image URL" />
    </div>
  )
}

"use client"

import { ReactNode, useState } from "react"
import AttachmentForm, { AttachmentProps } from "./attachment"
import EmbedForm, { EmbedProps } from "./embed"

export default function Generator() {
  const [embeds, setEmbeds] = useState<EmbedProps[]>([]);
  const [attachments, setAttachments] = useState<AttachmentProps[]>([]);

  function addEmbed() {
    if (embeds.length == 10) return;

    if (embeds.length == 0) {
      setEmbeds([{ index: 0, onDelete: deleteEmbed }]);
      return;
    }

    const index = embeds.at(-1)!.index + 1;
    console.log(index);
    setEmbeds([...embeds, { index: index, onDelete: deleteEmbed }]);
  }

  function deleteEmbed(index: number) {
    setEmbeds(embeds.filter((embed) => {
      return embed.index !== index;
    }));
  }

  function addAttachment() {
    if (embeds.length == 10) return;

    if (attachments.length == 0) {
      setAttachments([{ index: 0, onDelete: deleteAttachment, url: "" }]);
      return;
    }

    const index = attachments.at(-1)!.index + 1;
    setAttachments([...attachments, { index: index, onDelete: deleteAttachment, url: "" }]);
  }

  function deleteAttachment(index: number) {
    setAttachments(attachments.filter((attachment) => {
      return attachment.index !== index;
    }));
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Генератор сообщений</h1>
      <form className="mt-2 lg:w-1/2 space-y-2">
        <input name="message" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Channel ID" />
        <textarea name="message" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" placeholder="Message" />

        <div className="embeds">
          <div className="flex items-center gap-2">
            <h2 className="font-bold">Встроенные сообщения</h2>
            <p>({ embeds ? embeds.length : 0 } / 10)</p>
            <button type="button" onClick={addEmbed} className="underline">Добавить</button>
          </div>
          { embeds.map(embed => (
            <EmbedForm key={embed.index} index={embed.index} onDelete={deleteEmbed} />
          ))}
        </div>

        <div className="attachments">
          <div className="flex items-center gap-2">
            <h2 className="font-bold">Вложения</h2>
            <p>({ attachments ? attachments.length : 0 } / 10)</p>
            <button type="button" onClick={addAttachment} className="underline">Добавить</button>
          </div>
          { attachments.map(attachment => (
            <AttachmentForm key={attachment.index} index={attachment.index} onDelete={deleteAttachment} url="" />
          ))}
        </div>

        <button className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded" type="submit">Send</button>
      </form>
    </>
  )
}

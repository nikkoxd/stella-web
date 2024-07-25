import { ErrorMessage, Field, FieldArrayRenderProps } from "formik";

export interface AttachmentProps {
  index: number,
  arrayHelpers: FieldArrayRenderProps,
}

export default function AttachmentForm({ index, arrayHelpers }: AttachmentProps) {
  return (
    <div className="p-2 border border-current rounded">
      <div className="flex items-center gap-2">
        <p>Attachment {index}</p>
        <button type="button" onClick={() => arrayHelpers.remove(index)} className="underline">Удалить</button>
      </div>

      <Field name={`attachments[${index}]`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Image URL" />
      <ErrorMessage name={`attachments[${index}]`} />
    </div>
  )
}

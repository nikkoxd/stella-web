import { Field, FieldArrayRenderProps } from "formik";
import { FormValues } from "./page";

export interface FieldProps {
  index: number,
  embedIndex: number,
  arrayHelpers: FieldArrayRenderProps
  values: FormValues
}

export default function FieldForm({ index, embedIndex, arrayHelpers, values }: FieldProps) {
  return (
    <div className="field space-y-2">
      <div className="flex items-center gap-2">
        <p>Field {index}</p>
        <button type="button" onClick={() => arrayHelpers.remove(index)} className="underline">Удалить</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Field name={`embeds[${embedIndex}].fields[${index}].name`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Name" />
        <label>
          <Field name={`embeds[${embedIndex}].fields[${index}].inline`} type="checkbox" />
          Inline?
        </label>
      </div>
      <Field name={`embeds[${embedIndex}].fields[${index}].value`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Value" />
    </div>
  )
}

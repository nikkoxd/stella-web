import FieldForm from "./field";
import { Field, FieldArray, FieldArrayRenderProps } from "formik";
import { FormValues } from "./page";
import ErrorMessage from "@/app/errorMessage";

export interface EmbedProps {
  index: number,
  arrayHelpers: FieldArrayRenderProps,
  values: FormValues,
}

export default function EmbedForm({ index, arrayHelpers, values }: EmbedProps) {
  return (
    <div className="p-2 border border-current rounded">
      <div className="flex items-center gap-2">
        <p>Embed {index}</p>
        <button type="button" onClick={() => arrayHelpers.remove(index)} className="underline">Удалить</button>
      </div>

      <div className="space-y-2">
        <div className="author space-y-2">
          <p>Author</p>
          <Field name={`embeds[${index}].author.name`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Name" />
          <ErrorMessage name={`embeds[${index}].author.name`} />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Field name={`embeds[${index}].author.url`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="URL" />
              <ErrorMessage name={`embeds[${index}].author.url`} />
            </div>
            <div>
              <Field name={`embeds[${index}].author.icon_url`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Icon URL" />
              <ErrorMessage name={`embeds[${index}].author.icon_url`} />
            </div>
          </div>
        </div>

        <div className="body space-y-2">
          <p>Body</p>
          <Field name={`embeds[${index}].body.title`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Title" />
          <ErrorMessage name={`embeds[${index}].body.title`} />

          <Field as="textarea" name={`embeds[${index}].body.description`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" placeholder="Description" />
          <ErrorMessage name={`embeds[${index}].body.description`} />

          <div className="grid grid-cols-2 gap-2">
            <Field name={`embeds[${index}].body.url`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="URL" />
            <ErrorMessage name={`embeds[${index}].body.url`} />
            <Field name={`embeds[${index}].body.color`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="color" />
            <ErrorMessage name={`embeds[${index}].body.color`} />
          </div>
        </div>

        <div className="images space-y-2">
          <p>Images</p>
          <Field name={`embeds[${index}].images.image_url`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Image URL" />
          <ErrorMessage name={`embeds[${index}].images.image_url`} />
          <Field name={`embeds[${index}].images.thumbnail_url`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Thumbnail URL" />
          <ErrorMessage name={`embeds[${index}].images.thumbnail_url`} />
        </div>

        <div className="footer space-y-2">
          <p>Footer</p>
          <Field name={`embeds[${index}].footer.text`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Text" />
          <ErrorMessage name={`embeds[${index}].footer.text`} />
          <div className="grid grid-cols-2 gap-2">
            <Field name={`embeds[${index}].footer.icon_url`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Icon URL" />
            <ErrorMessage name={`embeds[${index}].footer.icon_url`} />
            <Field name={`embeds[${index}].footer.timestamp`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="date" placeholder="Timestamp" />
            <ErrorMessage name={`embeds[${index}].footer.timestamp`} />
          </div>
        </div>

        <FieldArray name={`embeds[${index}].fields`} render={arrayHelpers => (
          <div>
            <div className="flex gap-2">
              <p>Fields</p>
              <button type="button" onClick={() => arrayHelpers.push({ name: "", inline: false, value: "" })} className="underline">Добавить</button>
            </div>
            {values.embeds[index].fields?.map((_, fieldIndex) => (
              <FieldForm key={fieldIndex} index={fieldIndex} embedIndex={index} arrayHelpers={arrayHelpers} />
            ))}
          </div>
        )} />
      </div>
    </div>
  )
}

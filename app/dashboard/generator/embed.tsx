import FieldForm from "./field";
import { Field, FieldArray, FieldArrayRenderProps, FormikErrors, FormikTouched } from "formik";
import { FormValues } from "./page";

export interface EmbedProps {
  index: number,
  arrayHelpers: FieldArrayRenderProps,
  values: FormValues,
  errors: FormikErrors<FormValues>,
  touched: FormikTouched<FormValues>,
}

export default function EmbedForm({ index, arrayHelpers, values, errors, touched }: EmbedProps) {
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
          <div className="grid grid-cols-2 gap-2">
            <Field name={`embeds[${index}].author.url`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="URL" />
            <Field name={`embeds[${index}].author.icon_url`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Icon URL" />
          </div>
        </div>

        <div className="body space-y-2">
          <p>Body</p>
          <Field name={`embeds[${index}].body.title`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Title" />
          <Field as="textarea" name={`embeds[${index}].body.description`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" placeholder="Description" />
          <div className="grid grid-cols-2 gap-2">
            <Field name={`embeds[${index}].body.url`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="URL" />
            <Field name={`embeds[${index}].body.color`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="color" />
          </div>
        </div>

        <div className="images space-y-2">
          <p>Images</p>
          <Field name={`embeds[${index}].images.image_url`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Image URL" />
          <Field name={`embeds[${index}].images.thumbnail_url`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Thumbnail URL" />
        </div>

        <div className="footer space-y-2">
          <p>Footer</p>
          <Field name={`embeds[${index}].footer.text`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Text" />
          <div className="grid grid-cols-2 gap-2">
            <Field name={`embeds[${index}].footer.icon_url`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Icon URL" />
            <Field name={`embeds[${index}].footer.timestamp`} className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="date" placeholder="Timestamp" />
          </div>
        </div>

        <FieldArray name={`embeds[${index}].fields`} render={arrayHelpers => (
          <div>
            <div className="flex gap-2">
              <p>Fields</p>
              <button type="button" onClick={() => arrayHelpers.push({ name: "", inline: false, value: "" })} className="underline">Добавить</button>
            </div>
            {values.embeds[index].fields?.map((_, fieldIndex) => (
              <FieldForm key={fieldIndex} index={fieldIndex} embedIndex={index} arrayHelpers={arrayHelpers} values={values} />
            ))}
          </div>
        )} />
      </div>
    </div>
  )
}

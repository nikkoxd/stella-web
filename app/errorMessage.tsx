import { Field, FormikProps, getIn } from "formik";
import { FormValues } from "./dashboard/generator/page";

export default function ErrorMessage({ name }: { name: string }) {
  return (
    <Field
      name={name}
      render={({ form }: { form: FormikProps<FormValues> }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? (
          <div className="text-red-500">{error}</div>
        ) : null;
      }}
    />
  )
}

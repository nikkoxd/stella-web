"use client"

import { useState } from "react"
import AttachmentForm, { AttachmentProps } from "./attachment"
import EmbedForm, { EmbedProps } from "./embed"
import Embed from "@/types/embed";
import { Field, FieldArray, Form, Formik, FormikErrors } from "formik";

export interface FormValues {
  channelId: string,
  message: string,
  embeds: Embed[], 
  attachments: string[],
};

export default function Generator() {
  function handleSubmit(formData: FormData) {
    const data = {
      channelId: formData.get("channelId"),
      message: formData.get("message"),
    };

    console.log(data);
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Генератор сообщений</h1>
      <Formik
        initialValues={{
          channelId: "",
          message: "",
          embeds: [],
          attachments: [],
        }}
        validate={(values: FormValues) => {
          let errors: FormikErrors<FormValues> = {};

          if (!values.channelId) {
            errors.channelId = "Channel ID Required";
          }
          if (!(values.message || values.embeds.length)) {
            errors.message = "Either Message or any number of Embeds required";
          }

          return errors;
        }}
        onSubmit={(values: FormValues) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="mt-2 lg:w-1/2 space-y-2">
            <Field name="channelId" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Channel ID" />
            {touched.channelId && errors.channelId && <div className="text-red-500">{errors.channelId}</div>}
            <Field as="textarea" name="message" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" placeholder="Message" />
            {touched.message && errors.message && <div className="text-red-500">{errors.message}</div>}

            <FieldArray name="embeds" render={arrayHelpers => (
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold">Встроенные сообщения</h2>
                  <p>({ values.embeds.length } / 10)</p>
                  <button type="button" onClick={() => arrayHelpers.push({})} className="underline">Добавить</button>
                </div>
                { values.embeds.map((_, index) => (
                  <EmbedForm key={index} index={index} arrayHelpers={arrayHelpers} values={values} errors={errors} touched={touched} />
                ))}
              </div>
            )} />

            <FieldArray name="attachments" render={arrayHelpers => (
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold">Вложения</h2>
                  <p>({ values.attachments.length } / 10)</p>
                  <button type="button" onClick={() => arrayHelpers.push("")} className="underline">Добавить</button>
                </div>
                { values.attachments.map((_, index) => (
                  <AttachmentForm key={index} index={index} arrayHelpers={arrayHelpers} url="" />
                ))}
              </div>
            )} />

            <button className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded" type="submit">Send</button>
          </Form>
        )}
      </Formik>
    </>
  )
}

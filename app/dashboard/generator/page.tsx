"use client"

import ErrorMessage from "@/app/errorMessage";
import AttachmentForm from "./attachment"
import EmbedForm from "./embed"
import Embed from "@/types/embed";
import { Field, FieldArray, Form, Formik, FormikErrors } from "formik";
import * as Yup from "yup";

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

  const initialValues: FormValues = {
    channelId: "",
    message: "",
    embeds: [],
    attachments: [],
  };

  const embedSchema = Yup.object().shape({
    channelId: Yup.string()
      .min(17, "ID should be minimum 17 characters")
      .max(18, "ID should be no more than 18 characters")
      .matches(/^\d+$/, "ID can only contain numbers")
      .required("Channel ID required"),
    message: Yup.string()
      .max(2000, "Message should be no more then 2000 characters"),
    embeds: Yup.array()
      .of(Yup.object().shape({
        author: Yup.object().shape({
          name: Yup.string()
            .max(256, "Author name should be no more than 256 characters"),
          url: Yup.string()
            .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Provide a valid URL"),
          icon_url: Yup.string()
            .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Provide a valid URL"),
        }),
        body: Yup.object().shape({
          title: Yup.string()
            .max(256, "Title should be no more than 256 characters"),
          description: Yup.string()
            .max(4096, "Description should be no more than 4096 characters"),
          url: Yup.string()
            .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Provide a valid URL"),
          color: Yup.string(),
        }),
        images: Yup.object().shape({
          image_url: Yup.string()
            .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Provide a valid URL"),
          thumbnail_url: Yup.string()
            .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Provide a valid URL"),
        }),
        footer: Yup.object().shape({
          text: Yup.string()
            .max(2048, "Footer text should be no more than 2048 characters"),
          icon_url: Yup.string()
            .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Provide a valid URL"),
          timestamp: Yup.string(),
        }),
        fields: Yup.array()
          .of(Yup.object().shape({
            name: Yup.string()
              .max(256, "Field name should be no more than 256 characters"),
            inline: Yup.boolean(),
            value: Yup.string()
              .max(1024, "Field value should be no more than 1024 characters"),
          }))
          .max(25, "There can be no more than 25 fields in one embed"),
      }))
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Генератор сообщений</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={embedSchema}
        onSubmit={(values: FormValues) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="mt-2 lg:w-1/2 space-y-2">
            <Field name="channelId" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" type="text" placeholder="Channel ID" />
            <ErrorMessage name="channelId" />
            <Field as="textarea" name="message" className="px-2 py-1 w-full bg-white dark:bg-black border border-gray-400 rounded" placeholder="Message" />
            <ErrorMessage name="message" />

            <FieldArray name="embeds" render={arrayHelpers => (
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold">Встроенные сообщения</h2>
                  <p>({ values.embeds.length } / 10)</p>
                  <button type="button" onClick={() => arrayHelpers.push({
                    author: {
                      name: "",
                      url: "",
                      icon_url: "",
                    },
                    body: {
                      title: "",
                      description: "",
                      url: "",
                      color: "",
                    },
                    images: {
                      image_url: "",
                      thumbnail_url: "",
                    },
                    footer: {
                      text: "",
                      icon_url: "",
                      timestamp: "",
                    },
                    fields: []
                  })} className="underline">Добавить</button>
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
                  <AttachmentForm key={index} index={index} arrayHelpers={arrayHelpers} />
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

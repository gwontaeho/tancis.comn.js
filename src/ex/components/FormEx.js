import { Group, Button, Layout } from "@/components";
import { useForm } from "@/hooks";
import { useEffect } from "react";

const SCHEMA_SEARCH = {
  __form__: "search",
  text_1: { type: "text", maxLength: 5, label: "text", required: true },
  number_1: { type: "number", label: "number", validate: (e) => e > 4 },
  password_1: { type: "password", label: "password", required: true },
  select_1: { type: "select", label: "select", required: true },
  checkbox_1: { type: "checkbox", label: "checkbox", required: true },
  radio_1: { type: "radio", label: "radio", required: true },
  textarea_1: { type: "textarea", label: "textarea", required: true },
  date_1: { type: "date", label: "Date", required: true },
  time_1: { type: "time", label: "time", required: true },
  datetime_1: { type: "datetime", label: "datetime", required: true },
  file: { type: "file", required: true },
  between: {
    type: "between",
    label: "between 1",
    options: "date1",
    schema: { begin1: { type: "date", required: true }, end1: { type: "date", required: true } },
  },
  between1: {
    type: "between",
    label: "between 2",
    options: "date2",
    schema: { begin2: { type: "date" }, end2: { type: "date" } },
  },
  between2: {
    type: "between",
    label: "between 3",
    options: "date3",
    schema: { begin3: { type: "date" }, end3: { type: "date" } },
  },
};

const OPTION = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
];

export const FormEx = () => {
  const {
    schema,
    setSchema,
    setEditable,
    getValues,
    handleSubmit,
    setValue,
    clearErrors,
    resetSchema,
    validate,
    clearValues,
  } = useForm({ defaultSchema: SCHEMA_SEARCH });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {}, []);

  const etr = (v) => {
    setEditable(v);
  };

  return (
    <Layout direction="row">
      <Group>
        <Group.Header>Form Example</Group.Header>
        <Group.Table form onSubmit={handleSubmit(onSubmit)}>
          <Group.Row>
            <Group.Control {...schema.text_1} />
            <Group.Control {...schema.number_1} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.password_1} />
            <Group.Control {...schema.select_1} options={OPTION} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.checkbox_1} options={OPTION} />
            <Group.Control {...schema.radio_1} options={OPTION} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.textarea_1} />
            <Group.Control {...schema.date_1} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.time_1} />
            <Group.Control {...schema.datetime_1} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.between} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.between1} />
          </Group.Row>
          <Group.Row>
            <Group.Control {...schema.between2} />
          </Group.Row>
          <Group.Row>
            <Group.Control label controlSize={2} />
            <Group.Control />
            <Group.Control label type="select" controlSize={2} />
            <Group.Control />
          </Group.Row>
          <Group.Row>
            <Group.Col colSize={4}>
              <Button size="full">button size 4</Button>
            </Group.Col>
          </Group.Row>
        </Group.Table>
        <Layout.Right>
          <Button onClick={resetSchema}>reset schema</Button>
          <Button onClick={() => setSchema("text_1", { type: "text" })}>text_1 to text</Button>
          <Button onClick={() => setSchema("text_1", { type: "textarea" })}>text_1 to textarea</Button>
          <Button onClick={() => setSchema("text_1", { required: true })}>text_1 required true</Button>
          <Button onClick={() => setSchema("text_1", { required: false })}>text_1 required false</Button>
        </Layout.Right>
        <Layout.Right>
          <Button onClick={() => clearErrors()}>에러 초기화</Button>
          <Button onClick={clearValues}>값 초기화</Button>
          <Button onClick={etr}>edit true</Button>
          <Button onClick={() => etr(false)}>edit false</Button>
          <Button onClick={validate}>validate</Button>
          <Button onClick={() => console.log(getValues())}>get values</Button>
          <Button onClick={() => console.log(getValues("text_1"))}>get text_1</Button>
        </Layout.Right>
      </Group>
    </Layout>
  );
};

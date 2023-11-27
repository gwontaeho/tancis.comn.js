import { useEffect } from "react";
import { Group, Button, Layout, FormControl } from "@/com/components";
import { useForm } from "@/com/hooks";

const SCHEMA_SEARCH = {
  __form__: "search",
  text_1: {
    type: "text",
    label: "text",
    required: true,
    leftButton: { icon: "up" },
    rightButton: { icon: "search" },
    rightText: "kg",
    leftText: "cm",
  },
  number_1: { type: "number", label: "number", validate: (e) => e > 4, rightButton: { icon: "home" } },
  password_1: { type: "password", label: "password", required: true, leftButton: { icon: "down" } },
  select_1: { type: "select", label: "select", required: true, rightButton: { icon: "right" } },
  checkbox_1: { type: "checkbox", label: "checkbox", required: true },
  radio_1: { type: "radio", label: "radio", required: true },
  textarea_1: { type: "textarea", label: "textarea", required: true, rightButton: { icon: "search" } },
  date_1: { type: "date", label: "Date", required: true, leftButton: { icon: "search" }, leftText: "11" },
  time_1: { type: "time", label: "time", required: true },
  datetime_1: { type: "datetime", label: "datetime", required: true },
  file: { type: "file", required: true },
  between: {
    type: "between",
    label: "between 1",
    options: "date1",
    rightButton: { icon: "search" },
    leftText: "aqwdqwda",
    schema: {
      begin1: {
        type: "date",
        required: true,
        leftText: "aa",
        leftButton: { icon: "search" },
        rightButton: { icon: "search" },
      },
      end1: { type: "date", required: true, leftButton: { icon: "search" }, rightButton: { icon: "search" } },
    },
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
  between3: {
    type: "between",
    label: "between 4",
    schema: {
      begin4: { type: "date", leftButton: { icon: "search" } },
      end4: { type: "date", rightButton: { icon: "search" } },
    },
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

export const ExForm = () => {
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
  } = useForm({
    defaultSchema: SCHEMA_SEARCH,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {}, []);

  const etr = (v) => {
    setEditable(v);
  };

  return (
    <Layout>
      <Group>
        <Group.Header>Form Example</Group.Header>
        <form>
          <Group.Body>
            <Group.Row>
              <Group.Control {...schema.text_1} mask="JJ 0000" exact={false} onValueChange={(e) => console.log(e)} />
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
              <Group.Control {...schema.between} controlSize={10} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.between1} controlSize={10} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.between2} controlSize={10} />
            </Group.Row>
            <Group.Row>
              <Group.Control {...schema.between3} controlSize={10} />
            </Group.Row>
            <Group.Row>
              <Group.Label type="text" />
              <Group.Control />
              <Group.Label type="text" required={true} />
              <Group.Control />
            </Group.Row>
            <Group.Row>
              <Group.Col colSize={12}>
                <Button size="full">button size 4</Button>
                <FormControl type="file" />
              </Group.Col>
            </Group.Row>
          </Group.Body>
        </form>

        <Layout.Right>
          <Button onClick={resetSchema}>reset schema</Button>
          <Button onClick={() => setSchema("text_1", { type: "text" })}>text_1 to text</Button>
          <Button onClick={() => setSchema("text_1", { type: "textarea" })}>text_1 to textarea</Button>
          <Button onClick={() => setSchema("text_1", { required: true })}>text_1 required true</Button>
          <Button onClick={() => setSchema("text_1", { required: false })}>text_1 required false</Button>
          <Button onClick={() => setSchema("text_1", { leftText: null })}>remove text_1 lefttext</Button>
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

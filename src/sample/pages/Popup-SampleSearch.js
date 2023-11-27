import { useNavigate } from "react-router-dom";
import { useForm, useModal, useCondition, usePopup } from "@/com/hooks";
import { Group, Layout, PageHeader, Button } from "@/com/components";
import { OPTIONS, SCHEMA_FORM } from "./SampleService";

export const PopupSampleSearch = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { postMessage, getParams, closePopup } = usePopup();

  const { condition } = useCondition();
  const _form = useForm({ defaultSchema: SCHEMA_FORM, values: condition });

  const onSubmit = (data) => {
    postMessage(data);
  };

  return (
    <Layout>
      <PageHeader title="Sample Search Popup" description="Sample Search Popup Description" />
      <form onSubmit={_form.handleSubmit(onSubmit)}>
        <Group>
          <Group.Body>
            <Group.Row>
              <Group.Control {..._form.schema.con1} />
              <Group.Control {..._form.schema.con2} options={OPTIONS} />
            </Group.Row>
            <Group.Row>
              <Group.Control {..._form.schema._con34} controlSize={10} />
            </Group.Row>
          </Group.Body>
          <Layout.Right>
            <Button onClick={() => console.log(getParams())}>params 가져오기</Button>
            <Button type="submit">검색</Button>
          </Layout.Right>
        </Group>
      </form>
    </Layout>
  );
};

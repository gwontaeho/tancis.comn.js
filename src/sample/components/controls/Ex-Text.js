import { Layout, Group } from "@/com/components";

export const ExText = () => {
  return (
    <Layout>
      <Group>
        <Group.Body>
          <Group.Row>
            <Group.Control label="text input" mask="JK AAAAAA" />
          </Group.Row>
        </Group.Body>
      </Group>
    </Layout>
  );
};

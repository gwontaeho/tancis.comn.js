import { Layout, Group, Table, Button } from "@/com/components";

export const ExGroup = () => {
  return (
    <Layout gap={16}>
      <Group>
        <Group.Header size="lg">Group</Group.Header>
        <Group.Header>Group</Group.Header>
        <Group.Header size="sm">Group</Group.Header>
        <Group.Body>
          <Group.Row>
            <Group.Control label="text" />
            <Group.Control label="number" type="number" />
          </Group.Row>
          <Group.Row>
            <Group.Control label="password" type="password" />
            <Group.Control label="textarea" type="textarea" />
          </Group.Row>
          <Group.Row>
            <Group.Control label="radio" type="radio" />
            <Group.Control label="checkbox" type="checkbox" />
          </Group.Row>
          <Group.Row>
            <Group.Control label="time" type="time" />
            <Group.Control label="date" type="date" />
          </Group.Row>
          <Group.Row>
            <Group.Control label="datetime" type="datetime" />
            <Group.Control label="select" type="select" />
          </Group.Row>
          <Group.Row>
            <Group.Control
              label="between"
              type="between"
              schema={{ begin: { type: "date" }, end: { type: "date" } }}
              controlSize={10}
            />
          </Group.Row>
          <Group.Row>
            <Group.Control
              label="between"
              type="between"
              schema={{ begin: { type: "date" }, end: { type: "date" } }}
              options="date1"
              controlSize={10}
            />
          </Group.Row>
          <Group.Row>
            <Group.Control
              label="between"
              type="between"
              schema={{ begin: { type: "time" }, end: { type: "time" } }}
              options="time1"
              controlSize={10}
            />
          </Group.Row>
        </Group.Body>
      </Group>

      <Group className="[&_a]:text-blue">
        <Group.Body>
          <Table border={false}>
            <Table.Tr>
              <Table.Td>
                <a href="#Group">Group</a>
              </Table.Td>
              <Table.Td>
                <a href="#Header">Group.Header</a>
              </Table.Td>
              <Table.Td>
                <a href="#Body">Group.Body</a>
              </Table.Td>
              <Table.Td>
                <a href="#Row">Group.Row</a>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <a href="#Col">Group.Col</a>
              </Table.Td>
              <Table.Td>
                <a href="#Label">Group.Label</a>
              </Table.Td>
              <Table.Td>
                <a href="#Control">Group.Control</a>
              </Table.Td>
            </Table.Tr>
          </Table>
        </Group.Body>
      </Group>

      <Group id="Group">
        <Group.Header>Group</Group.Header>
        <Group.Body>
          <Table>
            <Table.Tr>
              <Table.Th>Attribute</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Default</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          </Table>
        </Group.Body>
      </Group>

      <Group id="Header">
        <Group.Header>Group.Header</Group.Header>
        <Group.Body>
          <Table>
            <Table.Tr>
              <Table.Th>Attribute</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Default</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          </Table>
        </Group.Body>
      </Group>

      <Group id="Body">
        <Group.Header>Group.Body</Group.Header>
        <Group.Body>
          <Table>
            <Table.Tr>
              <Table.Th>Attribute</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Default</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          </Table>
        </Group.Body>
      </Group>

      <Group id="#Row">
        <Group.Header>Group.Row</Group.Header>
        <Group.Body>
          <Table>
            <Table.Tr>
              <Table.Th>Attribute</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Default</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          </Table>
        </Group.Body>
      </Group>

      <Group id="#Col">
        <Group.Header>Group.Col</Group.Header>
        <Group.Body>
          <Table>
            <Table.Tr>
              <Table.Th>Attribute</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Default</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          </Table>
        </Group.Body>
      </Group>

      <Group id="#Label">
        <Group.Header>Group.Label</Group.Header>
        <Group.Body>
          <Table>
            <Table.Tr>
              <Table.Th>Attribute</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Default</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          </Table>
        </Group.Body>
      </Group>

      <Group id="Control">
        <Group.Header>Group.Control</Group.Header>
        <Group.Body>
          <Table>
            <Table.Tr>
              <Table.Th>Attribute</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Default</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          </Table>
        </Group.Body>
      </Group>
    </Layout>
  );
};

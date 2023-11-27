import { Grid, Group } from "@/com/components";
import { useGrid } from "@/com/hooks";

export const ExGrid = () => {
  const data = (page, size, totCnt = 10) => {
    return {
      totCnt,
      content: Array(size)
        .fill(null)
        .map((_, i) => ({
          col1: `${i}.aa.${page}`,
          col2: `${i}.bb.${page}`,
          col3: "2",
          col4: `${i}.dd.${page}`,
          col5: `${i}.ee.${page}`,
          col6: `${i}.ff.${page}`,
          col7: `${i}.gg.${page}`,
          col8: `${i}.hh.${page}`,
        })),
    };
  };

  const SCHEMA_NORMAL = {
    __grid__: "sample",
    options: {
      checkbox: true,
      edit: false,
    },
    head: [
      [
        { label: "col1" },
        { label: "col2" },
        { label: "col3" },
        { label: "col4" },
        { label: "col5" },
        { label: "col6qdqwqd" },
        { label: "col6qdqwqd" },
      ],
    ],
    body: [
      [
        { cel: [{ id: "col1" }] },
        { cel: [{ id: "col2" }] },
        { cel: [{ id: "col3" }] },
        { cel: [{ id: "col4" }] },
        { cel: [{ id: "col5", render: (data) => <div>col5 : {data.col5}</div> }] },
        { cel: [{ id: "col6", onClick: (data) => alert("col6 : " + data.col6) }] },
      ],
    ],
  };

  const { grid } = useGrid({ defaultSchema: SCHEMA_NORMAL });

  return (
    <div className="space-y-4">
      <Group>
        <Group.Header>Grid Example1</Group.Header>
        <Group.Body>
          <Grid {...grid} data={data(0, 10, 121)} />
        </Group.Body>
      </Group>
      <Group>
        <Group.Header>Grid Example2</Group.Header>
        <Group.Body>
          <Grid {...grid} data={data(0, 10, 121)} />
        </Group.Body>
      </Group>
    </div>
  );
};

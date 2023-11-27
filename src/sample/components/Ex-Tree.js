import { Layout, Group, Tree } from "@/com/components";

const treeviewItems = (search) => [
  {
    name: "public",
    id: "1",
    children: [
      {
        name: "assets",
        id: "2",
        children: [
          {
            name: "image",
            id: "3",
            children: [
              {
                name: "aa",
                icon: "image",
                iconClass: "text-success",
                dot: "info",
                id: "4",
              },
              {
                name: "generic.png",
                icon: "image",
                iconClass: "text-success",
                dot: "primary",
                id: "5",
              },
              {
                name: "shield.svg",
                icon: "sun",
                iconClass: "text-warning",
                dot: "primary",
                id: "6",
              },
            ],
          },
          {
            name: "video",
            id: "7",
            badge: 3,
            children: [
              {
                name: "beach.mp4",
                icon: "play",
                iconClass: "text-danger",
                dot: "warning",
                id: "8",
              },
              {
                name: "background.map",
                icon: "play",
                iconClass: "text-danger",
                dot: "warning",
                id: "9",
              },
            ],
          },
          {
            name: "js",
            id: "10",
            badge: 2,
            children: [
              {
                name: "theme.js",
                icon: ["fab", "js"],
                iconClass: "text-success",
                id: "11",
              },
              {
                name: "theme.min.js",
                icon: ["fab", "js"],
                iconClass: "text-success",
                id: "12",
              },
            ],
          },
        ],
      },
      {
        name: "dashboard",
        id: "13",
        children: [
          {
            name: "default.html",
            icon: ["fab", "html5"],
            iconClass: "text-danger",
            id: "14",
          },
          {
            name: "analytics.html",
            icon: ["fab", "html5"],
            iconClass: "text-danger",
            id: "15",
          },
          {
            name: "crm.html",
            icon: ["fab", "html5"],
            iconClass: "text-danger",
            id: "16",
          },
        ],
      },
      {
        name: "index.html",
        icon: ["fab", "html5"],
        iconClass: "text-danger",
        id: "17",
      },
    ],
  },
  {
    name: "Files",
    id: "18",
    children: [
      {
        name: "build.zip",
        icon: "file-archive",
        iconClass: "text-warning",
        id: "19",
      },
      {
        name: "live-1.3.4.zip",
        icon: "file-archive",
        iconClass: "text-warning",
        id: "20",
      },
      {
        name: "app.exe",
        icon: "file",
        iconClass: "text-primary",
        dot: "warning",
        id: "21",
      },
      {
        name: "export.csv",
        icon: "file",
        iconClass: "text-primary",
        dot: "primary",
        id: "22",
      },
      {
        name: "default.pdf",
        icon: "file-pdf",
        iconClass: "text-danger",
        dot: "primary",
        id: "23",
      },
      {
        name: "Yellow_Coldplay.wav",
        icon: "music",
        iconClass: "text-info",
        id: "24",
      },
    ],
  },
  {
    name: "package.json",
    icon: ["fab", "node-js"],
    iconClass: "text-success",
    id: "25",
  },
  {
    name: "package-lock.json",
    icon: ["fab", "node-js"],
    iconClass: "text-success",
    id: "26",
  },
  {
    name: "README.md",
    icon: "exclamation-circle",
    iconClass: "text-primary",
    id: "27",
  },
];

export const ExTree = () => {
  return (
    <Layout direction="row">
      <Group>
        <Group.Header>Tree 예제</Group.Header>
        <Tree data={treeviewItems()} />
      </Group>
      <Group>
        <Tree data={treeviewItems()} />
      </Group>
    </Layout>
  );
};

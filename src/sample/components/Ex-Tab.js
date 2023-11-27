import { Layout, Tab } from "@/com/components";
import { ExForm } from "./Ex-Form";
import { ExTree } from "./Ex-Tree";

export const ExTab = () => {
  return (
    <Layout>
      <Tab tab={["tab1", "tab2", "tab3"]}>
        <Tab.Panel>
          <ExForm />
        </Tab.Panel>
        <Tab.Panel>
          <ExForm />
        </Tab.Panel>
        <Tab.Panel>
          <ExTree />
        </Tab.Panel>
      </Tab>
    </Layout>
  );
};

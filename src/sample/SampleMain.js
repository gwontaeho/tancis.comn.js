import { Routes, Route } from "react-router-dom";

import { GroupEx } from "@/sample/components/GroupEx";
import { FormEx } from "@/sample/components/FormEx";
import { GridEx } from "@/sample/components/GridEx";
import { TabEx } from "@/sample/components/TabEx";
import { TreeEx } from "@/sample/components/TreeEx";
import { TableEx } from "@/sample/components/TableEx";
import { WijmoEx } from "@/sample/components/WijmoEx";
import { Editor } from "@/sample/components/Editor";

import { Sample } from "@/sample/pages/Sample";
import { SampleDetail } from "@/sample/pages/SampleDetail";
import { SampleRegist } from "@/sample/pages/SampleRegist";
import { SampleUpdate } from "@/sample/pages/SampleUpdate";

export const SampleMain = () => {
    return (
        <Routes>
            <Route path="/components/group" element={<GroupEx />} />
            <Route path="/components/form" element={<FormEx />} />
            <Route path="/components/grid" element={<GridEx />} />
            <Route path="/components/tab" element={<TabEx />} />
            <Route path="/components/tree" element={<TreeEx />} />
            <Route path="/components/wijmo" element={<WijmoEx />} />
            <Route path="/components/editor" element={<Editor />} />
            <Route path="/components/table" element={<TableEx />} />

            <Route path="/pages" element={<Sample />} />
            <Route path="/pages/:id" element={<SampleDetail />} />
            <Route path="/pages/:id/update" element={<SampleUpdate />} />
            <Route path="/pages/regist" element={<SampleRegist />} />
        </Routes>
    );
};

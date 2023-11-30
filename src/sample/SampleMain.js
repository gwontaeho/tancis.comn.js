import { Routes, Route } from "react-router-dom";

import { ExText } from "./components/controls/Ex-Text";

import { ExGroup } from "@/sample/components/Ex-Group";
import { ExForm } from "@/sample/components/Ex-Form";
import { ExGrid } from "@/sample/components/Ex-Grid";
import { ExTab } from "@/sample/components/Ex-Tab";
import { ExTree } from "@/sample/components/Ex-Tree";
import { ExTable } from "@/sample/components/Ex-Table";
import { ExWijmo } from "@/sample/components/Ex-Wijmo";
import { ExEditor } from "@/sample/components/Ex-Editor";

import { Sample } from "@/sample/pages/Sample";
import { SampleDetail } from "@/sample/pages/SampleDetail";
import { SampleRegist } from "@/sample/pages/SampleRegist";
import { SampleUpdate } from "@/sample/pages/SampleUpdate";

export const SampleMain = () => {
    return (
        <Routes>
            <Route path="/components/controls/text" element={<ExText />} />

            <Route path="/components/group" element={<ExGroup />} />
            <Route path="/components/form" element={<ExForm />} />
            <Route path="/components/grid" element={<ExGrid />} />
            <Route path="/components/tab" element={<ExTab />} />
            <Route path="/components/tree" element={<ExTree />} />
            <Route path="/components/wijmo" element={<ExWijmo />} />
            <Route path="/components/table" element={<ExTable />} />
            <Route path="/components/editor" element={<ExEditor />} />

            <Route path="/pages" element={<Sample />} />
            <Route path="/pages/:id" element={<SampleDetail />} />
            <Route path="/pages/:id/update" element={<SampleUpdate />} />
            <Route path="/pages/regist" element={<SampleRegist />} />
        </Routes>
    );
};

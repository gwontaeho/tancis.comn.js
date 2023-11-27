import { Routes, Route } from "react-router-dom";

import { PopupSampleSearch } from "./pages/Popup-SampleSearch";

export const SamplePopup = () => {
  return (
    <Routes>
      <Route path="/pages" element={<PopupSampleSearch />} />
    </Routes>
  );
};

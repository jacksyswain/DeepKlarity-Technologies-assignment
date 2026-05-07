import { useState } from "react";

import Navbar from "./components/Navbar";

import ExtractPage from "./pages/ExtractPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {

  const [tab, setTab] = useState("extract");

  return (
    <div>

      <Navbar
        tab={tab}
        setTab={setTab}
      />

      {tab === "extract" ? (
        <ExtractPage />
      ) : (
        <HistoryPage />
      )}
    </div>
  );
}
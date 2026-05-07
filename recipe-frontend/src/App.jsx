import { useState } from "react";

import Navbar from "./components/Navbar";

import ExtractPage from "./pages/ExtractPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {

  const [tab, setTab] =
    useState("extract");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">

      {/* NAVBAR */}
      <Navbar
        tab={tab}
        setTab={setTab}
      />

      {/* MAIN CONTENT */}
      <main className="pb-20">

        {tab === "extract" ? (
          <ExtractPage />
        ) : (
          <HistoryPage />
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t bg-white/70 backdrop-blur-sm">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">

          <div>

            <h2 className="font-bold text-lg">
              Recipe Extractor AI
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI-powered recipe extraction,
              nutrition analysis & meal
              planning.
            </p>

          </div>

          <div className="text-sm text-gray-500 text-center md:text-right">

            <p>
              Built with FastAPI, Gemini AI,
              PostgreSQL & React
            </p>

            <p className="mt-1">
              Frontend Assignment Submission
            </p>

          </div>

        </div>
      </footer>

    </div>
  );
}
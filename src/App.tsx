import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Lesson } from "@/pages/Lesson";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ders/:id" element={<Lesson />} />
      </Routes>
    </HashRouter>
  );
}

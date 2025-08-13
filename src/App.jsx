import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cursos from "./pages/Cursos";
import Inscripciones from "./pages/Inscripciones";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/inscripciones" element={<Inscripciones />} />
      
    </Routes>

  );
}

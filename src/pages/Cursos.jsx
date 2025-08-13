import React, { useState } from "react";
import FormularioInscripcion from "../components/FormularioInscripcion";
import Button from "../components/Button";
import { Link } from "react-router-dom";


export default function Cursos() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const cursos = [
    {
      titulo: "Programación Web",
      descripcion: "HTML, CSS, JavaScript y React.",
      imagen: "https://source.unsplash.com/400x250/?web,code",
    },
    {
      titulo: "Backend con Node.js",
      descripcion: "APIs REST, Express y MongoDB.",
      imagen: "https://source.unsplash.com/400x250/?nodejs,server",
    },
    {
      titulo: "Python para Principiantes",
      descripcion: "Aprende lógica con Python.",
      imagen: "https://source.unsplash.com/400x250/?python,code",
    },
    {
      titulo: "Bases de Datos",
      descripcion: "SQL, NoSQL, MySQL, MongoDB.",
      imagen: "https://source.unsplash.com/400x250/?database,sql",
    },
    {
      titulo: "Algoritmos y Estructuras",
      descripcion: "Pensamiento lógico y estructuras básicas.",
      imagen: "https://source.unsplash.com/400x250/?algorithm,code",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
     {/* Header */}
      <header className="bg-indigo-700 text-white p-8 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold">CodeJhov</div>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/cursos" className="hover:underline">Cursos</Link>
          <Link to="/inscripciones" className="hover:underline">Ver Inscripciones</Link>
          <Link to="/contacto" className="hover:underline">Contacto</Link>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow bg-white py-16 px-8 text-center">
        <h1 className="text-3xl font-semibold mb-6">Nuestros Cursos</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cursos.map((curso, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <img src={curso.imagen} alt={curso.titulo} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold mb-2">{curso.titulo}</h3>
              <p className="mb-4">{curso.descripcion}</p>
              <Button
                onClick={() => setMostrarFormulario(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Inscribirse
              </Button>
            </div>
          ))}
        </div>

        {/* Mostrar formulario si se activa */}
        {mostrarFormulario && (
          <FormularioInscripcion onCancel={() => setMostrarFormulario(false)} />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-indigo-700 text-white text-center p-15">
        <p>&copy; 2025 CodeCampus. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

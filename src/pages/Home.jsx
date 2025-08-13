import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";
import FormularioInscripcion from "../components/FormularioInscripcion";
import FormularioModal from "../components/FormularioModal";



export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [animateServicios, setAnimateServicios] = useState(false);

  // Animación cuando haces scroll a la sección "servicios"
  useEffect(() => {
    const handleScroll = () => {
      const serviciosSection = document.getElementById("servicios");
      if (serviciosSection) {
        const top = serviciosSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
          setAnimateServicios(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToServicios = () => {
    const section = document.getElementById("servicios");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      {/* Hero/Landing */}
      <section
        id="inicio"
        className="relative flex items-center justify-center text-black h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('https://ceutec.hn/wp-content/uploads/2024/07/cuales-son-lenguajes-programacion.png')" }}
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div> */}
        <div className="relative z-10 text-center max-w-xl px-4">
          <h1 className="text-5xl font-bold mb-4">Aprende a Programar desde Cero</h1>
          <p className="mb-6 text-lg">Cursos interactivos y mentorías para convertirte en desarrollador web.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <Button onClick={scrollToServicios} className="bg-blue                         -700 hover:bg-gray-800 text-white">
              Ver cursos
            </Button>
          </div>
        </div>
      </section>

      {/* Cursos / Servicios */}
      <section id="servicios" className="bg-white py-16 px-8 text-center">
        <h2 className="text-3xl font-semibold mb-6">Nuestros Cursos</h2>
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
            animateServicios ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Programación Web</h3>
            <p>HTML, CSS, JavaScript y React desde lo básico hasta avanzado.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Backend con Node.js</h3>
            <p>Aprende a crear APIs, manejar bases de datos y más.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Mentorías Personalizadas</h3>
            <p>Acompañamiento directo con expertos en programación.</p>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="bg-gray-100 py-16 px-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Contáctanos</h2>
        <p className="mb-6">¿Tienes dudas? ¡Escríbenos y te ayudamos a empezar tu camino como programador!</p>
        <Button onClick={() => setShowModal(true)} className="bg-green-600 hover:bg-green-700 text-white">
          Formulario de contacto
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-700 text-white text-center p-15">
        <p>&copy; 2025 CodeJhov. Todos los derechos reservados.</p>
      </footer>

      {/* Modal */}
      {showModal && <FormularioModal onClose={() => setShowModal(false)} />}

    </div>
  );
}

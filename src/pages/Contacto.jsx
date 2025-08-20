import React, { useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";


export default function Contacto() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Gracias ${formData.nombre}, recibimos tu mensaje!`);
        // Aquí después puedes conectarlo con tu backend o enviar por fetch
        setFormData({ nombre: "", email: "", mensaje: "" });
    };

    return (
        <div>
            <div>
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
            </div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">



                <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
                        Contáctanos
                    </h1>
                    <p className="text-center mb-6 text-gray-600">
                        ¿Tienes dudas o quieres más información?
                        Déjanos tu mensaje y te responderemos lo antes posible.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Tu correo"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                        <textarea
                            name="mensaje"
                            placeholder="Escribe tu mensaje..."
                            value={formData.mensaje}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                        ></textarea>

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Enviar Mensaje
                        </Button>
                    </form>
                </div>
            </div>
        </div>

    );
}

// src/components/FormularioModal.jsx
import React, { useState } from "react";

export default function FormularioModal({ onClose, curso }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !email) {
            alert("Por favor completa todos los campos.");
            return;
        }

        alert(`¡Inscripción exitosa al curso ${curso}!`);
        onClose(); // cerrar modal
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
                <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    ✖
                </button>
                <h2 className="text-xl font-semibold mb-4">Inscribirse en: {curso}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-left font-medium">Nombre:</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-left font-medium">Correo:</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 p-2 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                    >
                        consulta ahora
                    </button>
                </form>
            </div>
        </div>
    );
}

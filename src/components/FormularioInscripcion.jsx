import React, { useState } from "react";

export default function FormularioInscripcion({ onCancel }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    curso: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar datos al backend
    fetch("http://localhost:4000/api/inscribirse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en el servidor");
        return res.json();
      })
      .then(() => {
        alert("¡Inscripción registrada en MySQL!");
        onCancel(); // cierra el formulario
      })
      .catch((err) => alert("Error al guardar en la base de datos: " + err.message));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          Formulario de Inscripción
        </h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="curso"
          value={formData.curso}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Selecciona un curso</option>
          <option value="Programación Web">Programación Web</option>
          <option value="Backend con Node.js">Backend con Node.js</option>
          <option value="React desde Cero">React desde Cero</option>
          <option value="Python para Principiantes">Python para Principiantes</option>
          <option value="Bases de Datos">Bases de Datos</option>
        </select>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Inscribirme ahora
          </button>
        </div>
      </form>
    </div>
  );
}

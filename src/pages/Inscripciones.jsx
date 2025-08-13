import React, { useEffect, useState } from "react";

export default function Inscripciones() {
    const [inscripciones, setInscripciones] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        curso: ""
    });

    // Cargar inscripciones
    const cargarInscripciones = () => {
        fetch("http://localhost:4000/api/inscripciones")
            .then((res) => res.json())
            .then((data) => {
                console.log("Datos de inscripciones:", data); // <-- aquí se muestran en consola
                setInscripciones(data);
            })
            .catch((err) => console.error("Error al cargar inscripciones:", err));
    };


    useEffect(() => {
        cargarInscripciones();
    }, []);

    // Manejar cambios en edición ( es una edicion)
    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    // Inicia la ediciooon xd
    const iniciarEdicion = (insc) => {
        setEditId(insc.id);
        setEditData({
            nombre: insc.nombre,
            email: insc.email,
            telefono: insc.telefono,
            curso: insc.curso
        });
    };

    // Guardar la edicioooon(es una funcion)
    const guardarEdicion = (id) => {
        fetch(`http://localhost:4000/api/inscripciones/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editData)
        })
            .then((res) => res.json())
            .then(() => {
                setEditId(null);
                cargarInscripciones();
            })
            .catch((err) => console.error("Error al actualizar inscripción:", err));
    };

    // Eliminar inscripción
    const eliminarInscripcion = (id) => {
        if (!window.confirm("¿Deseas eliminar esta inscripción?")) return;
        fetch(`http://localhost:4000/api/inscripciones/${id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then(() => cargarInscripciones())
            .catch((err) => console.error("Error al eliminar inscripción:", err));
    };

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">Lista de Inscripciones</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-indigo-100 text-indigo-700 uppercase text-sm font-semibold">
                        <tr>
                            {["ID", "Nombre", "Email", "Teléfono", "Curso", "Fecha", "Acciones"].map((col) => (
                                <th key={col} className="py-3 px-6 text-left border-b border-indigo-300">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {inscripciones.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-gray-500">
                                    No hay inscripciones aún.
                                </td>
                            </tr>
                        ) : (
                            inscripciones.map((insc) => (
                                <tr key={insc.id} className="hover:bg-indigo-50 transition-colors duration-200">
                                    <td className="border-b border-gray-200 py-3 px-6">{insc.id}</td>

                                    <td className="border-b border-gray-200 py-3 px-6">
                                        {editId === insc.id ? (
                                            <input
                                                type="text"
                                                name="nombre"
                                                value={editData.nombre}
                                                onChange={handleEditChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : insc.nombre}
                                    </td>

                                    <td className="border-b border-gray-200 py-3 px-6">
                                        {editId === insc.id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editData.email}
                                                onChange={handleEditChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : insc.email}
                                    </td>

                                    <td className="border-b border-gray-200 py-3 px-6">
                                        {editId === insc.id ? (
                                            <input
                                                type="text"
                                                name="telefono"
                                                value={editData.telefono}
                                                onChange={handleEditChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : insc.telefono}
                                    </td>

                                    <td className="border-b border-gray-200 py-3 px-6">
                                        {editId === insc.id ? (
                                            <input
                                                type="text"
                                                name="curso"
                                                value={editData.curso}
                                                onChange={handleEditChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : insc.curso}
                                    </td>

                                    <td className="border-b border-gray-200 py-3 px-6">{new Date(insc.fecha).toLocaleString()}</td>

                                    <td className="border-b border-gray-200 py-3 px-6 space-x-2">
                                        {editId === insc.id ? (
                                            <>
                                                <button
                                                    onClick={() => guardarEdicion(insc.id)}
                                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                                >
                                                    Guardar
                                                </button>
                                                <button onClick={() => setEditId(null)} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => iniciarEdicion(insc)} className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500">
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => eliminarInscripcion(insc.id)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                                >
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

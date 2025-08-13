import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Configura la conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",       // o 127.0.0.1
    user: "root",            // usuario por defecto de XAMPP
    password: "",            // normalmente vacío en XAMPP
    database: "claseprogramación"    // el nombre de tu base de datos
});


//esto muy opcional, solo quiero ver ese mensaje xd
// Ruta raíz para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.send('mi ervidor Express esta corriendo correctamente');
});
// Aquí van otras rutas, como POST /api/inscribirse

//app.listen(PORT, () => {
 ///   console.log(`Servidor escuchando en http://localhost:${PORT}`);
//});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error al conectar con MySQL:", err);
        return;
    }
    console.log("Conectado a MySQL");
});

// Ruta POST para guardar mis inscripciones
app.post("/api/inscribirse", (req, res) => {
    const { nombre, email, telefono, curso } = req.body;

    if (!nombre || !email || !telefono || !curso) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }

    const query = `
    INSERT INTO inscripciones (nombre, email, telefono, curso)
    VALUES (?, ?, ?, ?)
`;

    db.query(query, [nombre, email, telefono, curso], (err, result) => {
        if (err) {
            console.error("Error al insertar inscripción:", err);
            return res.status(500).json({ mensaje: "Error al guardar en MySQL" });
        }
        res.status(200).json({ mensaje: "Inscripción guardada con éxito" });
    });
});

// Ruta GET para listar inscripciones  (aniadir esto para mostrar en el frontend los datos )
app.get('/api/inscripciones', (req, res) => {
  db.query('SELECT * FROM inscripciones', (err, results) => {
    if (err) {
        console.error('Error al obtener inscripciones:', err);
        return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
    res.json(results);
    });
});
//nueva funcion
// ELIMINAR INSCRIPCIÓN
app.delete("/api/inscripciones/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM inscripciones WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar inscripción:", err);
            return res.status(500).json({ error: "Error al eliminar inscripción" });
        }
        res.json({ message: "Inscripción eliminada correctamente" });
    });
});

// ACTUALIZAR INSCRIPCIÓN
app.put("/api/inscripciones/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono, curso } = req.body;
    db.query(
        "UPDATE inscripciones SET nombre = ?, email = ?, telefono = ?, curso = ? WHERE id = ?",
        [nombre, email, telefono, curso, id],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar inscripción:", err);
                return res.status(500).json({ error: "Error al actualizar inscripción" });
            }
            res.json({ message: "Inscripción actualizada correctamente" });
        }
    );
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

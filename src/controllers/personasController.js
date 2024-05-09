// personasController.js

const sql = require('mssql');
const dbConfig = require('../config/dbconfig');

async function agregarPersona(req, res) {
  try {
    const pool = await sql.connect(dbConfig);
    const { Nombre, Apellido, Dni, Cargo, Empresa } = req.body;

    const result = await pool.request()
      .input('Nombre', sql.NVarChar(100), Nombre)
      .input('Apellido', sql.NVarChar(100), Apellido)
      .input('Dni', sql.NVarChar(8), Dni)
      .input('Cargo', sql.NVarChar(100), Cargo)
      .input('Empresa', sql.NVarChar(100), Empresa)
      .query('INSERT INTO Personas (Nombre, Apellido, Dni, Cargo, Empresa) VALUES (@Nombre, @Apellido, @Dni, @Cargo, @Empresa)');

    res.status(200).send('Persona agregada correctamente');
  } catch (error) {
    console.error('Error al agregar persona:', error.message);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  agregarPersona,
};

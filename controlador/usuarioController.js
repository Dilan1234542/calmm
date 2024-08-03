const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");

// Función para obtener todos los libros
exports.getAllUsuario = async (req, res) => {
  try {
    const [usuarios] = await sequelize.query("SELECT * FROM usuarios");
    res.json(usuarios);
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    res.status(500).json({ error: error.message });
  }
};

// Función para obtener un libro por su ID
exports.getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const [usuarios] = await sequelize.query(
      "SELECT * FROM usuarios WHERE id = ?",
      {
        replacements: [id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (usuarios) {
      res.json(usuarios);
    } else {
      res.status(404).json({ error: "usuarios not found" });
    }
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    res.status(500).json({ error: error.message });
  }
};

// Función para autenticar un usuario basado en el correo electrónico y la contraseña
// Función para autenticar un usuario basado en el correo electrónico y la contraseña
exports.authenticateUser = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Consulta para obtener el usuario basado en el correo electrónico
    const usuarios = await sequelize.query(
      "SELECT * FROM usuarios WHERE correoelectronico = ?",
      {
        replacements: [correo],
        type: QueryTypes.SELECT,
      }
    );

    // Verificar si el usuario existe
    if (usuarios.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar la contraseña (este ejemplo supone que la contraseña es almacenada en texto plano; deberías usar un método seguro de almacenamiento)
    const usuario = usuarios[0];
    if (usuario.password === contraseña) {
      // Autenticación exitosa
      res.json({ message: "Autenticación exitosa", usuario });
    } else {
      // Contraseña incorrecta
      res.status(401).json({ error: "Contraseña incorrecta" });
    }
  } catch (error) {
    console.error("Error autenticando usuario:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      nombreCompleto,
      correoElectronico,
      activo,
      perfilAdministrador,
      perfilPublico,
    } = req.body;

    // Verificar que todos los campos necesarios están presentes
    if (
      !username ||
      !password ||
      !nombreCompleto ||
      !correoElectronico ||
      !activo ||
      !perfilAdministrador ||
      !perfilPublico
    ) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    // Consulta para insertar un nuevo usuario
    const [result] = await sequelize.query(
      `INSERT INTO Usuarios (USERNAME, PASSWORD, NOMBRECOMPLETO, CORREOELECTRONICO, ACTIVO, PERFILADMINISTRADOR, PERFILPUBLICO)
       VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`,
      {
        replacements: [
          username,
          password,
          nombreCompleto,
          correoElectronico,
          activo,
          perfilAdministrador,
          perfilPublico,
        ],
        type: QueryTypes.INSERT,
      }
    );

    // Responder con el usuario creado
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", usuario: result[0] });
  } catch (error) {
    console.error("Error creando usuario:", error);
    res.status(500).json({ error: error.message });
  }
};

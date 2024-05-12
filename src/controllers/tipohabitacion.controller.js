const TipoHabitacion = require("../models/TipoHabitacion");

const tipoHabitacionController = {
  // Función para obtener todos los tipos de habitación
  async listar(req, res) {
    try {
      const tiposHabitacion = await TipoHabitacion.find();
      return res.status(200).json(tiposHabitacion);
    } catch (error) {
      res
        .status(500)
        .json({
          mensaje: "Hubo un error al obtener los tipos de habitación",
          error: error.message,
        });
    }
  },

  // Función para obtener un tipo de habitación por su ID
  async mostrar(req, res) {
    try {
      const tipoHabitacion = await TipoHabitacion.findById(req.params.id);
      if (!tipoHabitacion) {
        return res
          .status(404)
          .json({ mensaje: "Tipo de habitación no encontrado" });
      }
      return res.status(200).json(tipoHabitacion);
    } catch (error) {
      res
        .status(500)
        .json({
          mensaje: "Hubo un error al obtener el tipo de habitación",
          error: error.message,
        });
    }
  },

  // Controlador para agregar un nuevo tipo de habitación
  async guardar(req, res) {
    try {
      const nuevoTipoHabitacion = new TipoHabitacion(req.body);
      await nuevoTipoHabitacion.save();
      return res
        .status(201)
        .json({ mensaje: "Tipo de habitación agregado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .json({
          mensaje: "Hubo un error al agregar el tipo de habitación",
          error: error.message,
        });
    }
  },

  // Controlador para actualizar un tipo de habitación existente
  async modificar(req, res) {
    try {
      await TipoHabitacion.findByIdAndUpdate(req.params.id, req.body);
      return res.status(201).json({ mensaje: "Tipo de habitación actualizado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .json({
          mensaje: "Hubo un error al actualizar el tipo de habitación",
          error: error.message,
        });
    }
  },

  // Controlador para eliminar un tipo de habitación existente
  async eliminar(req, res) {
    try {
      await TipoHabitacion.findByIdAndDelete(req.params.id);
      return res.status(200).json({ mensaje: "Tipo de habitación eliminado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .json({
          mensaje: "Hubo un error al eliminar el tipo de habitación",
          error: error.message,
        });
    }
  },
};

module.exports = tipoHabitacionController
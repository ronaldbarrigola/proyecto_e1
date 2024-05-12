const Habitacion = require('../models/Habitacion');

const habitacionController = {
  // Función para obtener todas las habitaciones
  async listar(req, res) {
    try {
      const habitaciones = await Habitacion.find().populate('tipo_habitacion_id');
      return res.status(200).json(habitaciones);
    } catch (error) {
      return res.status(500).json({ mensaje: "Hubo un error al obtener las habitaciones", error: error.message });
    }
  },

  // Función para obtener una habitación por su ID
  async mostrar(req, res) {
    try {
      const habitacion = await Habitacion.findById(req.params.id).populate('tipo_habitacion_id');
      if (!habitacion) {
        return res.status(404).json({ mensaje: "Habitación no encontrada" });
      }
      return res.status(200).json(habitacion);
    } catch (error) {
      return res.status(500).json({ mensaje: "Hubo un error al obtener la habitación", error: error.message });
    }
  },

  // Controlador para agregar una nueva habitación
  async guardar(req, res) {
    try {
      const nuevaHabitacion = new Habitacion(req.body);
      await nuevaHabitacion.save();
      return res.status(201).json({ mensaje: "Habitación agregada correctamente" });
    } catch (error) {
      return res.status(500).json({ mensaje: "Hubo un error al agregar la habitación", error: error.message });
    }
  },

  // Controlador para actualizar una habitación existente
  async modificar(req, res) {
    try {
      await Habitacion.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).json({ mensaje: "Habitación actualizada correctamente" });
    } catch (error) {
      return res.status(500).json({ mensaje: "Hubo un error al actualizar la habitación", error: error.message });
    }
  },

  // Controlador para eliminar una habitación existente
  async eliminar(req, res) {
    try {
      await Habitacion.findByIdAndDelete(req.params.id);
      return res.status(200).json({ mensaje: "Habitación eliminada correctamente" });
    } catch (error) {
      return res.status(500).json({ mensaje: "Hubo un error al eliminar la habitación", error: error.message });
    }
  },

  // consulta por estado 
  // /habitaciones?estado=Excelente
  // /habitaciones?estado=mantenimiento
  // GET http://127.0.0.1:3000/habitacion-estado?estado=Excelente
  async buscarHabitacionesPorEstado(req, res) {
    try {
      const estado = req.query.estado;
      const habitaciones = await Habitacion.find({ estado_mantenimiento: estado });
      return res.status(200).json(habitaciones);
    } catch (error) {
      return res.status(500).json({ mensaje: "Hubo un error al buscar habitaciones por estado", error: error.message });
    }
  },

  // busqueda de habitaciones por (tipo de habitacion y que esten disponibles) 
  async buscarHabitacionesDisponiblesParaTipo(req, res) {
    try {
      let tipoHabitacionId = req.params.id;
      let disponible = req.query.disponible
      const habitaciones = await Habitacion.find({ tipo_habitacion_id: tipoHabitacionId, disponible: disponible });
      return res.status(200).json(habitaciones);
    } catch (error) {
      return res.status(500).json({ mensaje:'Hubo un error al buscar habitaciones disponibles para un tipo específico'}, error);
    
    }
  },
  // busqueda de habitaciones por disponibilidad 
  async buscarHabitacionesPorDisponibilidad(req, res) {
    try {
      let disponible = req.query.disponible
      const habitaciones = await Habitacion.find({ disponible: disponible });
      return res.status(200).json(habitaciones);
    } catch (error) {
      return res.status(500).json({ mensaje:'Hubo un error al buscar habitaciones disponibles para un tipo específico'}, error);
    
    }
  },

  async consultarHabitacionesDisponiblesMenoresPorPrecio(req, res) {
    try {

      const habitaciones = await Habitacion.find({ disponible: true, precio: { $lt: req.query.precio } });
      return res.status(200).json(habitaciones);
    } catch (error) {
      return res.status(500).json({ mensaje:'Hubo un error al buscar habitaciones disponibles con ese precio'}, error);

    }
  }
  
};

module.exports = habitacionController;

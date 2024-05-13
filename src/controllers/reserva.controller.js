const Reserva = require('../models/Reserva');

const reservaController = {
  // Obtener todas las reservas
  async listar(req, res) {
    try {
      const reservas = await Reserva.find();
      res.json(reservas);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Hubo un error al obtener las reservas', error: error.message });
    }
  },

  // Obtener una reserva por su ID
  async mostrar(req, res) {
    try {
      const reserva = await Reserva.findById(req.params.id).populate(['usuario', 'huesped', 'habitaciones']);
      if (!reserva) {
        return res.status(404).json({ mensaje: 'Reserva no encontrada' });
      }
      res.json(reserva);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Hubo un error al obtener la reserva', error: error.message });
    }
  },

  // Agregar una nueva reserva
  async guardar(req, res) {
    try {
      const nuevaReserva = new Reserva(req.body);
      await nuevaReserva.save();
      res.status(201).json({ mensaje: 'Reserva agregada correctamente' });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Hubo un error al agregar la reserva', error: error.message });
    }
  },

  // Actualizar una reserva existente
  async modificar(req, res) {
    try {
      await Reserva.findByIdAndUpdate(req.params.id, req.body);
      res.json({ mensaje: 'Reserva actualizada correctamente' });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Hubo un error al actualizar la reserva', error: error.message });
    }
  },

  // Eliminar una reserva existente
  async eliminar(req, res) {
    try {
      await Reserva.findByIdAndDelete(req.params.id);
      return res.json({ mensaje: 'Reserva eliminada correctamente' });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Hubo un error al eliminar la reserva', error: error.message });
    }
  },

  // /reserva-estado?estado=reservado
  async buscarReservasPorEstado(req, res) {
    try {
      const estado = req.query.estado;
      const reservas = await Reserva.find({ estado: estado });
      return res.status(200).json(reservas);
    } catch (error) {
      console.error('Hubo un error al buscar reservas por estado:', error);
      throw error;
    }
  }
};

module.exports = reservaController;

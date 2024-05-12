const Huesped = require('../models/Huesped');

const huespedController = {
  // Obtener todos los huéspedes
  async listar(req, res) {
    try {
      const huespedes = await Huesped.find();
      res.json(huespedes);
    } catch (error) {
      res.status(500).json({ mensaje: 'Hubo un error al obtener los huéspedes', error: error.message });
    }
  },

  // Obtener un huésped por su ID
  async mostrar(req, res) {
    try {
      const huesped = await Huesped.findById(req.params.id);
      if (!huesped) {
        return res.status(404).json({ mensaje: 'Huésped no encontrado' });
      }
      res.json(huesped);
    } catch (error) {
      res.status(500).json({ mensaje: 'Hubo un error al obtener el huésped', error: error.message });
    }
  },

  // Agregar un nuevo huésped
  async guardar(req, res) {
    try {
      const nuevoHuesped = new Huesped(req.body);
      await nuevoHuesped.save();
      res.status(201).json({ mensaje: 'Huésped agregado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Hubo un error al agregar el huésped', error: error.message });
    }
  },

  // Actualizar un huésped existente
  async modificar(req, res) {
    try {
      await Huesped.findByIdAndUpdate(req.params.id, req.body);
      res.json({ mensaje: 'Huésped actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Hubo un error al actualizar el huésped', error: error.message });
    }
  },

  // Eliminar un huésped existente
  async eliminar(req, res) {
    try {
      await Huesped.findByIdAndDelete(req.params.id);
      res.json({ mensaje: 'Huésped eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Hubo un error al eliminar el huésped', error: error.message });
    }
  },

  async buscarHuespedesPorDocumentoIdentidad(req, res) {
    try {
      let ci = req.query.ci;

      const huespedes = await Huesped.find({ documento_identidad: { $regex: '^'+ci } });
      return res.status(200).json(huespedes);
    } catch (error) {
      console.error('Hubo un error al buscar huéspedes por documento de identidad:', error);
      return res.status(500).json({ mensaje: 'Hubo un error al buscar por ci', error: error.message });
    }
  }
};

module.exports = huespedController;

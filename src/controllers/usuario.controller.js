const Usuario = require('../models/Usuario');

const usuarioController = {
  // Obtener todos los usuarios
  async listar(req, res) {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ mensaje: 'Hubo un error al obtener los usuarios', error: error.message });
    }
  },

  // Obtener un usuario por su ID
  async mostrar(req, res) {
    try {
      const usuario = await Usuario.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ mensaje: 'Hubo un error al obtener el usuario', error: error.message });
    }
  },

  // Agregar un nuevo usuario
  async guardar(req, res) {
    try {
      const nuevoUsuario = new Usuario(req.body);
      await nuevoUsuario.save();
      res.status(201).json({ mensaje: 'Usuario agregado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Hubo un error al agregar el usuario', error: error.message });
    }
  },

  // Actualizar un usuario existente
  async modificar(req, res) {
    try {
      await Usuario.findByIdAndUpdate(req.params.id, req.body);
      res.json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Hubo un error al actualizar el usuario', error: error.message });
    }
  },

  // Eliminar un usuario existente
  async eliminar(req, res) {
    try {
      await Usuario.findByIdAndDelete(req.params.id);
      return res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Hubo un error al eliminar el usuario', error: error.message });
    }
  },

  async buscarUsuariosPorNombre(req, res) {
    try {
      let nombre = req.query.nombre
      const usuarios = await Usuario.find({ name: { $regex: '.*' + nombre + '.*', $options: 'i' } });
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Hubo un error al buscar el usuario', error: error.message });
    }
  }
};

module.exports = usuarioController;

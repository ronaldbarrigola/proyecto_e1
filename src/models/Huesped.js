const mongoose = require('mongoose');

const huespedSchema = new mongoose.Schema({
  nombre_completo: String,
  correo: {
    type: String
  },
  documento_identidad: String,
  nacionalidad: String,
  telefono_celular: String  
});

const Huesped = mongoose.model('Huesped', huespedSchema);

module.exports = Huesped;
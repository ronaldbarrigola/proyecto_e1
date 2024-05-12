const mongoose = require('mongoose')

const habitacionSchema = new mongoose.Schema({
    tipo_habitacion_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TipoHabitacion'
    },
    numero: String,
    disponible: Boolean,
    precio: Number,
    tipo_moneda: String,
    comodidades: [String],
    estado_mantenimiento: String,
    fotos: [String]
});

const Habitacion = mongoose.model('Habitacion', habitacionSchema);

module.exports = Habitacion;
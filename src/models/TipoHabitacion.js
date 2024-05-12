const mongoose = require('mongoose')

const tipoHabitacionSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio_base: Number,
    tipo_moneda: String,
    capacidad_maxima: Number,
    comodidades: [String],
    fotos: [String]
});

const TipoHabitacion = mongoose.model('TipoHabitacion', tipoHabitacionSchema);

module.exports = TipoHabitacion;
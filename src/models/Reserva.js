const mongoose = require('mongoose')

const reservaSchema = new mongoose.Schema({
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    huesped: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Huesped',
    },
    tipo_habitaciones:[{tipo_habitacion: String, cantidad: Number}],
    habitaciones: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habitacion',
    }],
    fecha_hora_ingreso: String,
    fecha_hora_salida: String,
    nro_noches_reserva: Number,
    cantidad_huespedes: Number,

    precio_total: Number,
    solicitudes_especiales: [String],
    estado: String,
    codigo_reserva: String,
    razon_de_no_reserva: String
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;
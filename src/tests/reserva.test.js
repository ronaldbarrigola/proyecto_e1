// test/reservaController.test.js
const express = require('express');
const request = require('supertest');
const mongoose = require('mongoose');
const Reserva = require('../models/Reserva');
const Usuario = require('../models/Usuario');
const Huesped = require('../models/Huesped');
const Habitacion = require('../models/Habitacion');
const reservaRoutes = require('../rutas/index.js');
const app = express();
app.use(express.json());
app.use('/', reservaRoutes);

// Middleware de autenticación mock
jest.mock('../middleware/auth.middleware', () => (req, res, next) => next());

describe('Pruebas Unitarias para Reservas', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await Reserva.deleteMany({});
    await Usuario.deleteMany({});
    await Huesped.deleteMany({});
    await Habitacion.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Debería registrar y listar una reserva, El Usuario registra la habitacion, Huesped y registra la reserva', async () => {
    const usuario = await Usuario.create({ name: 'John Doe', email: 'john@example.com', password: 'john54321' });
    const huesped = await Huesped.create({ nombre_completo: 'Ana Paredez', correo: 'ana@mail.com', documento_identidad: 987654321, nacionalidad: 'Chilena' });
    const habitacion = await Habitacion.create({ tipo_habitacion_id: '66418c62e502defe2ecea339', numero: '302', disponible: true, precio: 150, tipo_moneda: "Bolivianos", estado_mantenimiento: 'Disponible' });

    await Reserva.create({
      usuario: usuario._id,
      huesped: huesped._id,
      habitaciones: [habitacion._id],
      fecha_hora_ingreso: '2025-01-01T12:00:00Z',
      fecha_hora_salida: '2025-01-02T12:00:00Z',
      nro_noches_reserva: 1,
      cantidad_huespedes: 2,
      precio_total: 200,
      estado: 'Confirmada',
      codigo_reserva: 'RES123'
    });

    const res = await request(app).get('/reserva');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].usuario._id).toEqual(usuario._id.toString());
    expect(res.body[0].huesped._id).toEqual(huesped._id.toString());
    expect(res.body[0].habitaciones[0]._id).toEqual(habitacion._id.toString());
  }, 10000);
});

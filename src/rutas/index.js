const { Router } = require("express");
const Route = Router();
const authController = require("./../controllers/auth.controller")
const tipoHabitacionController = require('./../controllers/tipohabitacion.controller');
const habitacionController= require('./../controllers/habitacion.controller');
const reservaController= require('./../controllers/reserva.controller');
const huespedController = require('./../controllers/huesped.controller');
const usuarioController = require("./../controllers/usuario.controller");

const authMiddleware = require('./../middleware/auth.middleware');

Route.get("/", function(req, res){
    return res.json({mensaje: "CRUD API REST"});
})
//***************************** AUTENTICACION (login y registro) ****************************** */
// rest autenticación
Route.post("/login", authController.login);
Route.post("/registro", authController.registro);

Route.post("/cerrar-sesion", authMiddleware, authController.cerrarSesion);


// consultas avanzadas 
//***************************** CONSULTAS AVANZADAS *************************************** */
// busqueda de habitaciones por (tipo de habitacion y que esten disponibles)
// GET http://127.0.0.1:3000/habitacion/tipo/:id?disponible=true
Route.get('/habitacion/tipo/:id', habitacionController.buscarHabitacionesDisponiblesParaTipo);

// busqueda de habitaciones por (disponibilidad)
// GET http://127.0.0.1:3000/habitacion-disponibilidad?disponible=true
Route.get('/habitacion-disponibilidad', habitacionController.buscarHabitacionesPorDisponibilidad);

// Consulta de habitaciones disponibles y con un precio menor a precio (140)
// http://127.0.0.1:3000/habitacion-menores-precio?precio=140
Route.get('/habitacion-menores-precio', habitacionController.consultarHabitacionesDisponiblesMenoresPorPrecio);

// buscar Habitaciones Por Estado (Mantenimiento, Excelente, Limpieza)
// GET http://127.0.0.1:3000/habitacion-estado?estado=Excelente
Route.get('/habitacion-estado', habitacionController.buscarHabitacionesPorEstado);
// GET http://127.0.0.1:3000/reserva-estado?estado=reservado
Route.get('/reserva-estado', reservaController.buscarReservasPorEstado);

// buscar Huespedes PorDocumentoIdentidad
// GET http://127.0.0.1:3000/huesped-busqueda?ci=123456
Route.get('/huesped-busqueda', huespedController.buscarHuespedesPorDocumentoIdentidad);

// buscar Usuarios Por Nombre
// GET http://127.0.0.1:3000/usuario-nombre?nombre=ad
Route.get('/usuario-nombre', usuarioController.buscarUsuariosPorNombre);

//***************************** CRUD ******************************************************** */
// Usuarios
// Ruta para obtener todos los usuarios
Route.get('/usuario', authMiddleware, usuarioController.listar);
// Ruta para obtener un usuario por su ID
Route.get('/usuario/:id', authMiddleware, usuarioController.mostrar);
// Ruta para agregar un nuevo usuario
Route.post('/usuario', authMiddleware, usuarioController.guardar);
// Ruta para actualizar un usuario existente
Route.put('/usuario/:id', authMiddleware, usuarioController.modificar);
// Ruta para eliminar un usuario existente
Route.delete('/usuario/:id', authMiddleware, usuarioController.eliminar);


// Tipo Habitacion

// Ruta para obtener todos los tipos de habitación
Route.get('/tipo-habitacion', tipoHabitacionController.listar);
// Ruta para obtener un tipo de habitación por su ID
Route.get('/tipo-habitacion/:id', tipoHabitacionController.mostrar);
// Ruta para agregar un nuevo tipo de habitación
Route.post('/tipo-habitacion', tipoHabitacionController.guardar);
// Ruta para actualizar un tipo de habitación existente
Route.put('/tipo-habitacion/:id', tipoHabitacionController.modificar);
// Ruta para eliminar un tipo de habitación existente
Route.delete('/tipo-habitacion/:id', tipoHabitacionController.eliminar);


// Habitacion
Route.get('/habitacion', authMiddleware,habitacionController.listar);
// Ruta para obtener una habitación por su ID
Route.get('/habitacion/:id', habitacionController.mostrar);
// Ruta para agregar una nueva habitación
Route.post('/habitacion', habitacionController.guardar);
// Ruta para actualizar una habitación existente
Route.put('/habitacion/:id', habitacionController.modificar);
// Ruta para eliminar una habitación existente
Route.delete('/habitacion/:id', habitacionController.eliminar);

// Huesped
// Listado
Route.get('/huesped', huespedController.listar);
// Ruta para obtener un huésped por su ID
Route.get('/huesped/:id', huespedController.mostrar);
// Ruta para agregar un nuevo huésped
Route.post('/huesped', huespedController.guardar);
// Ruta para actualizar un huésped existente
Route.put('/huesped/:id', huespedController.modificar);
// Ruta para eliminar un huésped existente
Route.delete('/huesped/:id', huespedController.eliminar);


// Reservas
// Ruta para obtener todas las reservas
Route.get('/reserva', authMiddleware, reservaController.listar);
// Ruta para obtener una reserva por su ID
Route.get('/reserva/:id', authMiddleware, reservaController.mostrar);
// Ruta para agregar una nueva reserva
Route.post('/reserva', authMiddleware, reservaController.guardar);
// Ruta para actualizar una reserva existente
Route.put('/reserva/:id', authMiddleware, reservaController.modificar);
// Ruta para eliminar una reserva existente
Route.delete('/reserva/:id', authMiddleware, reservaController.eliminar);

module.exports = Route

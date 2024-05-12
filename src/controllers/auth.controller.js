const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Usuario = require('./../models/Usuario');

const authController = {
    async login(req, res){

        try {
            const datos = req.body;

            const existeUser = await Usuario.findOne({email: datos.email})
            if(!existeUser){
                return res.status(401).json({mensaje: "Credenciales incorrectas"});
            }

            // verificamos la contraseña
            let correcto = await bcrypt.compare(datos.password, existeUser.password);

            if(correcto){
                // Generar el TOKEN (JWT)
                const payload = {
                    id: existeUser._id,
                    email: existeUser.email,
                    time: new Date()
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRACION
                });

                const {email, name, _id} = existeUser;

                return res.status(201).json({
                    access_token: token,
                    user: {
                        _id,
                        name,
                        email
                    },
                    error: false
                });
            }else{
                return res.status(401).json({mensaje: "Credenciales Incorrectas", error: true})            
            }
        } catch (error) {
            return res.status(500).json({mensaje: "Error al autenticase", error: error.message});
        }
    },
    async registro(req, res){
        try {
            const datos = req.body;
            // verificar si el email ya existe
            const existeUser = await Usuario.findOne({email: datos.email})
            if(existeUser){
                return res.status(400).json({mensaje: "El correo electronico, ya está registrado"});
            }
            
            // cifrando password (bcrypt)
            datos.password = await bcrypt.hash(req.body.password, 12);
            // crear el usuario
            const nuevoUsuario = new Usuario(datos);

            await nuevoUsuario.save();
            
            return res.status(201).json({mensaje: "Usuario Registrado"});

        } catch (error) {
            return res.status(500).json({mensaje: "Error al registrar el usuario", error: error.message});
        }
    }
}


module.exports = authController
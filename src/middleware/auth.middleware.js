const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

async function authMiddlware(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const user = await Usuario.findOne({ activeToken: token });
    if(user == null){
        return res.status(401).send({
            auth: false,
            mensaje: "El token no es valido (Requiere Login)"
        })
    }
    if (token == null )
        return res.status(401).send({
            auth: false,
            mensaje: "No se proporcionó el token de autorización (Requiere Login)"
        })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({
            auth: false,
            mensaje: "Error de Acceso"
        });

        req.user = user;
        req.token = token;
        next();
    });
}

module.exports = authMiddlware;
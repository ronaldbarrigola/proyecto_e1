const jwt = require("jsonwebtoken");

function authMiddlware(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
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
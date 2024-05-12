const express = require("express");
require('dotenv').config()
const Route = require("./rutas/index.js")
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

// application/json
app.use(express.json())

//***************************** CONEXION CON BD mongoDB (mongoose) *************************************** */

main().catch(err => console.log(err));

async function main() {
    const NODE_ENV = process.env.NODE_ENV || 'development'
    if(NODE_ENV=='development'){
        await mongoose.connect(`mongodb://${process.env.BD_HOST}:27017/${process.env.BD_NAME}`);
        console.log("CONEXION EXITOSA CON BD MONGODB (D)")
    }else{
        await mongoose.connect(`mongodb://${process.env.BD_USER}:${process.env.BD_PASSWORD}@${process.env.BD_HOST}:27017/${process.env.BD_NAME}`);
        console.log("CONEXION EXITOSA CON BD MONGODB (P)")
    }
}


// rutas
app.use(Route);


app.listen(PORT, function (){
    console.log("Servidor de Node Iniciado en http://localhost:"+PORT);
})

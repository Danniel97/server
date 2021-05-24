const express = require("express");
const mongoose = require("mongoose"); /*importacion de las librerias de mongoose*/
const cors = require("cors");
const app = express();

const FoodModel = require("./models/Food"); /* importacion de datos*/

app.use(express.json()); /*permite recibir informacion del front en formato JSON*/
app.use(cors());

mongoose.connect(
    "mongodb+srv://danielito:duoc2021@cluster0.e5n6b.mongodb.net/food?retryWrites=true&w=majority", 
    {
    useNewUrlParser: true, /*analiza la conexion, si es exitosa o no*/
    }
);  /*conexion de mongoose con el cluster alojado en  atlas*/

app.post("/insert", async (req, res) => { /*funcion asincrona, ya que debemos hacer cada paso indivudualmente*/
    const nombreComida = req.body.nombreComida;
    const cantidadComida = req.body.cantidadComida;

    
    const food = new FoodModel({nombreComida: nombreComida, cantidadComida: cantidadComida}); /*insertamos los datos en la BD*/
    
    try {
        await food.save(); /*guarda los datos de comida en su coleccion*/
        res.send("Datos insertados"); /* muestra un mensaje en el front,
                                     el cual demuestra que se insertaron los datos*/
    } catch(err) {
        console.log(err); /*si hay un error, muestra un mensaje*/
    }
});

app.get("/read", async (req, res) => { 
    FoodModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
});

app.put("/update", async (req, res) => { 
    const nuevaComida = req.body.nuevaComida;
    const id = req.body.id;
    
    try {
        await FoodModel.findById(id, (err, comidaActualizada) => {
            comidaActualizada.nombreComida = nuevaComida
            comidaActualizada.save();
            res.send("Actualizado")
        })
    } catch(err) {
        console.log(err); /*si hay un error, muestra un mensaje*/
    }
});

/*Conexion a puerto 3001 con mensaje de estado*/
app.listen(3001, ()=> {
    console.log("Corriendo en puerto 3001");
});
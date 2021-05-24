const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({ /*Inserciones de colleciones y documentos que iran a la BD*/
    nombreComida: { /*nombre de variable*/
        type: String, /*tipo de dato*/
        required: true, /*si es requerido */
    },
    cantidadComida: { /*nombre de variable*/
        type: Number, /*tipo de dato*/
        required: true, /*si es requerido */
    },
});

const Food = mongoose.model("Food", FoodSchema); /*esquema en donde insertaremos los datos*/
module.exports = Food;
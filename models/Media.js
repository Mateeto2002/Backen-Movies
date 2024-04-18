const { Schema, model } = require('mongoose')

const MediaSchema = new Schema({
    serial: {type: String, unique: true, require: true },
    titulo: {type: String, require: true},
    sinopsis: {type: String, require: true},
    url: {type: String, require: true, unique: true},
    portada: {type:String , require: true},
    fechaCreacion: { type: Date, require: true},
    fechaActualizacion: { type: Date, require: true },
    añoEstreno: {type: Date, requite: true},
    
    genero: {type: Schema.Types.ObjectId, ref:'Genero', require: true },
    director: {type: Schema.Types.ObjectId, ref:'Director', require: true },
    productora: {type: Schema.Types.ObjectId, ref:'Productora', require: true },
    tipo: {type: Schema.Types.ObjectId, ref:'Tipo', require: true }


  });


  module.exports = model('Media', MediaSchema);
const { Router } = require('express');
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let director = new Director();
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date;
        director.fechaActualizacion = new Date;

        director = await director.save();

        res.send(director);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error aaaa');
    }
});

//Listar director GET
router.get('/', async function (req, res) {
    try {
        const director = await Director.find()

        res.send(director);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

//Actualizar lista 
router.put('/:directorID', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }
        let director = await Director.findById(req.params.directorID);
        if (!director) {
            return res.status(400).send('director no existe');
        }

        
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaActualizacion = new Date;
        

        director = await director.save();

        res.send(director);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error :( aqui ta');
    }
});

module.exports = router;





const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty()

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = new Tipo();
        
        tipo.nombre = req.body.nombre;
        tipo.fechaCreacion = new Date;
        tipo.fechaActualizacion = new Date;
        tipo.descripcion = req.body.descripcion;


        tipo = await tipo.save();

        res.send(tipo);

    } catch (error) {
        console.log(error);
        
    }
});

//Listar tipo GET
router.get('/', async function (req, res) {
    try {
        const tipo = await Tipo.find()

        res.send(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error aquii');
    }
});

//Actualizar lista 
router.put('/:tipoID', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty()

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }
        let tipo = await Tipo.findById(req.params.tipoID);
        if (!tipo) {
            return res.status(400).send('tipo no existe');
        }

        
        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaActualizacion = new Date;
        

        tipo = await tipo.save();

        res.send(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error :( aqui ta');
    }
});

module.exports = router;
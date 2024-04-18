const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [

    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url', 'invalid.url').not().isEmpty(),
    check('portada', 'invalid.portada').not().isEmpty(),
    check('estreno', 'invalid.estreno').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty()

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial });
        if (existeMediaPorSerial) {
            return res.status(400).send('Serial ya existente');
        }

        let media = new Media();

        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.portada = req.body.portada;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();
        media.estreno = req.body.estreno;
        media.genero = req.body.genero;
        media.director = req.body.director;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;

        media = await media.save();
        res.status(500).send(media);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en la media ');
    }
});

router.get('/', async function (req, res) {
    try {
        const medias = await Media.find().populate([
            {
                path: 'genero', select: 'nombre'
            },
            {
                path: 'director', select: 'nombre'
            },
            {
                path: 'productora', select: 'nombre'
            },
            {
                path: 'tipo', select: 'nombre'
            }
        ]);
        res.send(medias);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:mediaID', [

    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url', 'invalid.url').not().isEmpty(),
    check('portada', 'invalid.portada').not().isEmpty(),
    check('estreno', 'invalid.estreno').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty()

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial });
        if (existeMediaPorSerial) {
            return res.status(400).send('Serial ya existente');
        }
        let media = await Media.findById(req.params.mediaID)
        if(!media){
            return res.status(400).send('Media no Existe');
        }


        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.portada = req.body.portada;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();
        media.estreno = req.body.estreno;
        media.genero = req.body.genero;
        media.director = req.body.director;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;

        media = await media.save();
        res.status(500).send(media);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en la media ');
    }
});

router.delete('/:mediaID', async function (req, res) {
    


    try{

        let media = await Media.findById(req.params.mediaID);

    media = await media.deleteOne();

    res.send(media);

    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error en la media ');

    }
    


  });







module.exports = router;
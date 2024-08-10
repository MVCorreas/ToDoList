//?CREAMOS Y DEFINIMOS LOS CONTROLLERS Y LAS RUTAS

const { Router } = require("express"); //Módulo de express para crear y gestionr rutas

//Importación de controllers

const postNote = require('../controllers/postNote')
const editNote = require('../controllers/editNote')
const deleteNote = require('../controllers/deleteNote')
const archiveNote = require('../controllers/archiveNote')
const unarchiveNote = require('../controllers/unarchiveNote')
const getActiveNotes = require('../controllers/getActiveNotes')
const getArchivedNotes = require('../controllers/getArchivedNotes')
const filterNotesByTag = require('../controllers/filterNotesByTag')


const router = Router(); //Creamos un enrutador o instancia de Router llamada router

//Definición de rutas
router.post('/notes', postNote);
router.put('/notes/:id', editNote);
router.delete('/notes/:id', deleteNote);
router.put('/notes/:id/archive', archiveNote);
router.put('/notes/:id/unarchive', unarchiveNote);
router.get('/notes', getActiveNotes);
router.get('/notes/archived', getArchivedNotes);
router.get('/notes/:tag', filterNotesByTag);


module.exports = router;

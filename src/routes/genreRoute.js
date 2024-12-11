const express = require('express');
const { createGenre, getAllGenres, deleteGenre } = require('../controllers/genreController');
const router = express.Router();
router.use(express.json());


router.post('/',createGenre);

router.get('/',getAllGenres);

router.delete('/:genreId',deleteGenre);

module.exports = router;

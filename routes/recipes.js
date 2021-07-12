const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Recipe = require('../models/Recipe');
const RecipeController = require('../controllers/recipecontroller');

const authorize = require('../verifytoken'); // authorisointi eli vahvistetaan token

// 1) KAIKKIEN RESEPTIEN HAKU
router.get('/', RecipeController.findAll);

// 2) YHDEN RESEPTIN HAKU
router.get('/:id', RecipeController.findById2);

// Kaikki reitit joiden kautta voidaan muokata kantaa on suojattu

// 3) LISÄÄ RESEPTIN KANTAAN
router.post('/', authorize, RecipeController.add);

// 4) POISTAA RESEPTIN KANNASTA ID:N AVULLA
router.delete('/:id', authorize, RecipeController.deleteRecipe);

// 5) PÄIVITTÄÄ RESEPTIN
router.patch('/:postId', authorize, RecipeController.updateRecipe);

module.exports = router;

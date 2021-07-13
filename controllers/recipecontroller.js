/*
Kontrolleri on tehty jotta saadaan sovellukseen parempi arkkitehtuuri.
Reitit ja tietokantahakujen sovelluslogiikka on erotettu toisistaan.
*/
// Haetaan model
const Recipe = require('../models/Recipe');

// tietokannan käsittelymetodit tehdään olion sisään
const RecipeController = {
  // findAll -metodi hakee kaikki reseptit
  findAll: (req, res) => {
    Recipe.find((error, recipes) => {
      if (error) {
        throw error;
      }
      res.json(recipes);
    });
  },
  // findById hakee yhden reseptin _id:n perusteella
  findById: (req, res) => {
    // findOne argumentit: hakukriteeri eli _id:tä vastaava id saadaan clientilta, callback, jolla saadaan tieto
    Recipe.findOne({ _id: req.params.id }, (error, recipe) => {
      if (error) {
        throw error;
      }
      res.json(recipe);
    });
  },
  // findById2 hakee yhden reseptin id:n perusteella
  findById2: (req, res) => {
    Recipe.findOne({ id: req.params.id }, (error, student) => {
      if (error) {
        throw error;
      }
      res.json(student);
    });
  },
  // lisää reseptin
  add: (req, res) => {
    // eslint-disable-next-line new-cap
    const NewRecipe = Recipe(req.body);

    NewRecipe.save((error, result) => {
      if (error) {
        throw error;
      }
      console.log('Recipe added');
      res.json(result);
    });
  },
  // poistaa yhden reseptin id:n perusteella
  deleteRecipe: (req, res) => {
    // deleteOne argumentit: hakukriteeri eli _id:tä vastaava id saadaan clientilta, callback, jolla saadaan tieto
    Recipe.deleteOne({ id: req.params.id }, (error, result) => {
      if (error) {
        throw error;
      }
      //res.send('recipe deleted');
      res.json(result);
    });
  },
  // päivittää reseptin
  updateRecipe: async (req, res) => {
    try {
      const updatedPost = await Recipe.findById(req.params.postId);
      updatedPost.author = req.body.author;
      updatedPost.name = req.body.name;
      updatedPost.recipe = req.body.recipe;
      const up1 = await updatedPost.save();
      res.json(up1);
    } catch (err) {
      res.json({ message: err });
    }
  },
};

module.exports = RecipeController;

const mongoose = require('mongoose');
require('dotenv').config(); //dotenv -moduuli tarvitaan jos aiotaan käyttää .env -filua

mongoose.set('useUnifiedTopology', true); // määritys jota käytetään tietokantapalvelimen etsinnässä
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

// yhteydenotto MongoDB Atlas -kantaan:

const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_CONNECTION_STRING, (req, res) => {
      console.log('Connected to the database');
    })
    .then(() => console.log('connected to DB.'))
    .catch((err) => console.log(err));
};
module.exports = connectDB;
/*
mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (req, res) => {
    console.log('Connected to the database');
  }
);
*/
/*
mongoose
  .connect(
    'mongodb+srv://terppa:<Lcftrp666>@reseptit.nuned.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('connected to DB.'))
  .catch((err) => console.log(err));
  */

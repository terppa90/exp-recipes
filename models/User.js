const mongoose = require('mongoose');

// Skeeman luonti. Skeema määrittää kannassa olevan tiedon muodon.
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isadmin: { type: Boolean, required: true },
});
// Tehdään skeemasta model
const User = mongoose.model('User', UserSchema);

// exportataan model
module.exports = User;

const mongoose = require('mongoose');
const validators = require('../helpers/validators');

const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 35
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: validators.validateHttp,
      message: props => `${props.value} is not a valid link!`
    }
  },
  difficultyLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  accessories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accessory'
    }
  ]
});

cubeSchema.methods.getDescription = function() {
  return this.description;
};

module.exports = mongoose.model('Cube', cubeSchema);

const mongoose = require('mongoose');
const validators = require('../helpers/validators');

const accessorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: validators.validateHttp,
      message: props => `${props.value} is not a valid link!`
    }
  },
  description: {
    type: String,
    required: true,
    maxlength: 50
  },
  cubes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cube'
    }
  ]
});

module.exports = mongoose.model('Accessory', accessorySchema);

const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
    date: {
        type: String, // format: YYYY-MM-DD
        required: true,
        unique: true,
      },
      count: {
        type: Number,
        default: 0,
      },
});

module.exports = mongoose.model('visit', visitSchema);

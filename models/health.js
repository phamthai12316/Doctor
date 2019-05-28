var mongoose = require('mongoose');

var HealthSchema = new mongoose.Schema({
    disease: {
        type: String,
        require: true,
        unique: true
    },
    cause: {
        type: String,
    },
    consequence: {
        type: String,
    },
    symptom: {
        type: String,
    },
    infectious: {
        type: Boolean,
    },
    sideEffect: {
        type: String,
    },
    prevention: {
        type: String,
    },
    treatment: {
        type: String,
    },
    imageUrl: String,
    status: Number
});

HealthSchema.index({disease: 'text'});
var Health = mongoose.model('health', HealthSchema);

module.exports = Health;
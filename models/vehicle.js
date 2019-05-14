var mongoose = require('mongoose');

var vehicleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time_created: {
        type: Date,
        default: Date.now
    },
    car_type: {
        type: String,
        enum: ['SUV', 'Truck', 'Hybrid'],
        required: true
    },
    last_successful_connection: {
        type: Date,
        required: true
    }
});

var Vehicle = module.exports = mongoose.model('vehicle', vehicleSchema);

module.exports.get =async function (callback, limit) {
    await Vehicle.find(callback).limit(limit);
}
Vehicle = require('../models/Vehicle');

// Handle index actions
exports.index = function (req, res) {
    try {
        Vehicle.get(function (err, vehicles) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            else {
                res.json({
                    status: "success",
                    message: "Vehicles retrieved successfully",
                    data: vehicles
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
};

// Handle create vehicle actions
exports.new = function (req, res) {
    try {
        var vehicle = new Vehicle();
        vehicle.name = req.body.name ? req.body.name : vehicle.name;
        vehicle.car_type = req.body.car_type;
        var dateParts = req.body.last_successful_connection.split('-');
        vehicle.last_successful_connection = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        // save the vehicle and check for errors
        vehicle.save(function (err) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({
                    message: 'New vehicle created!',
                    data: vehicle
                });
            }
        });

    } catch (error) {
        console.error(error);
    }
};

// Handle view vehicle info
exports.view = function (req, res) {
    try {
        Vehicle.findById(req.params.vehicle_id, function (err, vehicle) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    message: 'Vehicle details loading..',
                    data: vehicle
                });
            }
        });

    } catch (error) {
        console.error(error);
    }
};

// Handle update vehicle info
exports.update = function (req, res) {
    try {
        Vehicle.findById(req.params.vehicle_id, function (err, vehicle) {
            if (err) {
                res.send(err);
            }
            else {
                vehicle.name = req.body.name ? req.body.name : vehicle.name;
                vehicle.car_type = req.body.car_type;
                vehicle.time_created = vehicle.time_created;
                var dateParts = req.body.last_successful_connection.split('-');
                vehicle.last_successful_connection = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
                // save the vehicle and check for errors
                vehicle.save(function (err) {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        res.json({
                            message: 'Vehicle updated',
                            data: vehicle
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
};

// Handle delete vehicle
exports.delete = function (req, res) {
    try {
        Vehicle.deleteOne({
            _id: req.params.vehicle_id
        }, function (err, vehicle) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    status: "success",
                    message: 'Vehicle deleted'
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
};
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
       status: 'API Its Working',
       message: 'API works'
    });
});

var vehicleController = require('./controllers/vehicle');

// Vehicle routes
router.route('/vehicles')
    .get(vehicleController.index)
    .post(vehicleController.new);
router.route('/vehicles/:vehicle_id')
    .get(vehicleController.view)
    .patch(vehicleController.update)
    .put(vehicleController.update)
    .delete(vehicleController.delete);

module.exports = router;
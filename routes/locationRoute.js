const express = require('express')
const router = express.Router()
const locationController   = require('../controllers/locationController')

router.post('/insert', locationController.createLocation)
router.post('/update', locationController.updateLocation)
router.post('/tag', locationController.tagLocation)
router.post('/location_name', locationController.nameLocation)
router.get('/:location_id', locationController.getLocation)

module.exports = router
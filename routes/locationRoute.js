const express = require('express')
const router = express.Router()
const locationController   = require('../controllers/locationController')

//GET localhost:3000/api/post
//router.get('/list', locationController.listFriendReq)
router.post('/insert', locationController.createLocation)
router.post('/update', locationController.updateLocation)
router.post('/tag', locationController.tagLocation)
router.get('/:location_id', locationController.getLocation)


module.exports = router

const express = require('express')
const router = express.Router()
const planningController = require('../controllers/planningController')
const authentication = require('../middleware/authenticationHandler');

router.post('/insert', planningController.insertPlan)
router.post('/update', planningController.updatePlan)
router.delete('/delete/:trip_id', planningController.deletePlan)
router.get('/user/:user_id', planningController.getUserPlan)
router.get('/trip/:trip_id', planningController.getPlanFromID)
router.post('/location', planningController.getPlanFromLocationTag)
// router.post('/delete', commentController.deleteComment)
// router.get('/find/:user_id', authentication.isLoggedIn, commentController.findUserComment)

module.exports = router
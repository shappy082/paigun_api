const express = require('express')
const { body } = require('express-validator');
const userController = require('../controllers/userController')
const userProfileController = require('../controllers/userProfileController')
const authentication = require('../middleware/authenticationHandler');
const authorization = require('../middleware/authorizationHandler');

const router = express.Router()

router.post('/signup', [
    body('username').not().isEmpty().withMessage('Field username is required'),
    body('password').not().isEmpty().withMessage('Field password is required').isLength({ min: 6 }).withMessage('Password must be  at least 6 digits')
], userProfileController.signup);
router.post('/signin',
    body('name').not().isEmpty().withMessage('Field name is required'),
    body('password').not().isEmpty().withMessage('Field password is required')
    , userController.signin);
router.get('/me', authentication.isLoggedIn, userController.getProfile);

router.get('/', userController.index);
router.get('/:id', authentication.isLoggedIn, userController.getUserById);
router.put('/:id', authentication.isLoggedIn, userController.updateUser);
router.delete('/:id', [authentication.isLoggedIn, authorization.isAdmin], userController.deleteUser);
module.exports = router


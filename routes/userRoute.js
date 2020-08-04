const express = require('express')
const { body } = require('express-validator');
const userController = require('../controllers/userController')
const authentication = require('../middleware/authenticationHandler');
const authorization = require('../middleware/authorizationHandler');

const router = express.Router()
router.post('/signin', [
  body('username').not().isEmpty().withMessage('Field username is required'),
  body('password').not().isEmpty().withMessage('Field password is required')
], userController.signin);
router.post('/signup', [
  body('username').not().isEmpty().withMessage('Field username is required'),
  body('password').not().isEmpty().withMessage('Field password is required'),
  body('name').not().isEmpty().withMessage('Field name is required')
], userController.signup);

module.exports = router


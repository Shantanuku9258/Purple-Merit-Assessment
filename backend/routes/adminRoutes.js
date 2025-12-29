const express = require('express');
const router = express.Router();
const { getUsers, activateUser, deactivateUser } = require('../controllers/adminController');
const authenticate = require('../middleware/auth');
const checkAdmin = require('../middleware/roleCheck');

router.get('/users', authenticate, checkAdmin, getUsers);
router.patch('/users/:id/activate', authenticate, checkAdmin, activateUser);
router.patch('/users/:id/deactivate', authenticate, checkAdmin, deactivateUser);

module.exports = router;


const { Router } = require('express');

const { registerUser } = require('../controllers/auth');

/**
 * @path /api/auth
 */
const router = Router();

router.post('/register', registerUser);

module.exports = router;

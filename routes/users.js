const { Router } = require('express');

const { validateJwt } = require('../middleware/validateToken');
const { getUsers } = require('../controllers/users');

/**
 * @path /api/users
 */
const router = Router();

router.get('/', validateJwt, getUsers);

module.exports = router;

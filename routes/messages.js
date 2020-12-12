const { Router } = require('express');

const { validateJwt } = require('../middleware/validateToken');
const { getMessages } = require('../controllers/messages');

/**
 * @path /api/messages
 */
const router = Router();

router.get('/:from', validateJwt, getMessages);

module.exports = router;

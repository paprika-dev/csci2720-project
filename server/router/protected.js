const express = require('express');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/protected', auth, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

module.exports = router;

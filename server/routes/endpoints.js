const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/api', (req, res) => {
    res.json('Hello World')
})

router.get('/auth', (req, res) => {
    const hash = bcrypt.hashSync('hello', 12)
    res.json(hash)
})

module.exports = router
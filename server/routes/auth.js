const express = require('express');
const passport = require('passport');

const router = express.Router()

router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        return res.json({
            message: 'user created!!',
            user: req.body
        });
    })(req, res, next);
});


module.exports = router;
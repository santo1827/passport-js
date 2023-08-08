const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router()

router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err)
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

router.post('/login', (req, res, next) => {
    passport.authenticate('login', {session: false}, (err, user, info) => {
        if (!user || err ) {
            const error = new Error('An Error Occured')
        } 

        req.login(
            user,
            {session: false},
            (error) => {
              if (error) return next(error)

              const body = {_id: user.id, email: user.email }
              const token = jwt.sign({ user: body}, 'TOP_SECRET');

              return res.json(token)
            }
        )
    })(req, res, next);
});

module.exports = router;
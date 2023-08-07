const passport = require('passport');
const localStrategy = require('passport-local');
const con = require('../config/db');

passport.use(
    'signup',
    new localStrategy(
        {
            passReqToCallback : true,
            usernameField: 'email',
            passwordField: 'password'
        },
        (req, email, password, done) => {
            const sqlCheck = 'SELECT email FROM users WHERE email = ?';

            con.query(sqlCheck, [email], (error, results) => {
                if (error) {
                    console.error(error);
                    return done(error);
                }
                
                if (results.length > 0) {
                    return done(null, false, { message: 'User already assigned an account' });
                }

                const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
                
                con.query(query, [String(email), String(password)], (insertError, result) => {
                    if (insertError) {
                        console.error(insertError);
                        return done(insertError);
                    }
                    
                    // Provide additional user information if needed
                    const newUser = {
                        id: result.insertId,
                        email: email,
                        password: password
                    };

                    return done(null, newUser); // Call done after user is successfully inserted
                });
            });
        }
    )
);


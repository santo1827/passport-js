const passport = require('passport');
const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs')
const con = require('../config/db');

// ...

passport.use(
    'signup',
    new localStrategy(
        {
            passReqToCallback: true,
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

                const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password

                const query = 'INSERT INTO users (email, password) VALUES (?, ?)';

                con.query(query, [email, hashedPassword], (insertError, result) => {
                    if (insertError) {
                        console.error(insertError);
                        return done(insertError);
                    }

                    // Provide additional user information if needed
                    const newUser = {
                        id: result.insertId,
                        email: email,
                        password: hashedPassword // Store the hashed password
                    };

                    return done(null, newUser); // Call done after user is successfully inserted
                });
            });
        }
    )
);

// ...


passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            const selectQuery = 'SELECT password FROM users WHERE email = ?'; // Use lowercase "password" here

            con.query(selectQuery, [email], (error, response) => {
                if (error) {
                    console.error(error);
                    return done(error);
                }
                if (!response || response.length === 0) {
                    return done(null, false, { message: "User not found" });
                } else {
                    const hashedPassword = response[0].password;

                    const compare = bcrypt.compareSync(password, hashedPassword);

                    if (compare) {
                        return done(null, response[0], { message: 'Successfully logged in!' });
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                }
            });
        }
    )
);

// ...



const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy(
        {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token, done) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
        }
    )
);
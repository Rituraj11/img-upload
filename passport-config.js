const dotenv = require('dotenv')

dotenv.config();

const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./models/userModel');

exports.initializePassport = (passport) => {

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWTPRIVATEKEY;

    passport.use( new JwtStrategy(opts, async (jwtPayload, done) => {
        try {
            const user = await User.findOne({ email: jwtPayload.email });

            if(!user) return done(null, false);

            return done(null, user);

        } catch (error) {
            console.log(error)
            return done(error, false);
        }
    }));


    // passport.serializeUser( (user, done) => {
    //     done(null, user.id);
    // });

    // passport.deserializeUser( async (id, done) => {
    //     try {
    //         const user = await User.findById(id);
            
    //         console.log('deserialize data', user)
    //         done(null, user);
    //     } catch (error) {
    //         done(error, false);
    //     }
    // });
}

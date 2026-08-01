import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";


passport.use(
    new LocalStrategy(
        {
        usernameField: "email",
        passwordField: "password",
        },
        async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
            return done(null, false, { message: "Invalid email or password" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
            return done(null, false, { message: "Invalid email or password" });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
        }
    )
);

// serialize user to store the id in the session
passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

// deserialize user to retrieve the user object from the database using the id stored in the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
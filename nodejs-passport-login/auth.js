const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const users = [{
    _id: 1,
    username: "adm",
    password: "$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW",
    email: "contato@luiztools.com.br"
}];

module.exports = function (passport) {
    function findUser(username) {
        return global.db.collection("users").findOne({ "username": username });
    }

    function findUserById(id) {
        const ObjectId = require("mongodb").ObjectId;
        return global.db.collection("users").findOne({ _id: ObjectId.createFromHexString(id) });
    }

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findUserById(id);
            done(null, user);
        }
        catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        async (username, password, done) => {
            try {
                const user = await findUser(username);
                // usuário inexistente 
                if (!user) {
                    return done(null, false);
                }

                // comparando as senhas
                const isValid = bcrypt.compareSync(password, user.password);
                if (!isValid) return done(null, false);
                
                return done(null, user);
            }
            catch (err) {
                done(err, false);
            }
        }));
}
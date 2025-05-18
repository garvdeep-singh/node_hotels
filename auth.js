import passport from 'passport';
import LocalStrategy from 'passport-local';
LocalStrategy.Strategy;
import Person from './models/person.js';

passport.use(new LocalStrategy(
  async (USERNAME, password, done)=>{
    try {
      console.log("Received credentials:", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isPasswordmatch = await user.comparePassword(password);
      if (isPasswordmatch !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

export default passport;
const router = require('express').Router();
const authController = require('./controller');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({usernameField: 'email'}, authController.localStrategy));
router.get('/signup', authController.index);
router.get('/signup/:id', authController.getId);
router.delete('/signup/:id', authController.deleteId);
router.post('/signup', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.me);




module.exports = router;
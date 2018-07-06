// load all the things we need
const LocalStrategy = require('passport-local');
const User = require('../../models/user');
const passport = require('passport')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	console.log('*** serializeUser called, user: ')
	console.log(user) // the whole raw user object!
	console.log('---------')
	done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	console.log('DeserializeUser called')
	User.findOne(
		{ _id: id },
		'username',
		(err, user) => {
			console.log('*** Deserialize user, user:')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport

// const strategy = (passport) => {
//   // =========================================================================
//   // passport session setup ==================================================
//   // =========================================================================
//   // required for persistent login sessions
//   // passport needs ability to serialize and unserialize users out of session

//   // used to serialize the user for the session
//   passport.serializeUser(function (user, done) {
//     done(null, user.id);
//   });

//   // used to deserialize the user
//   passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//       done(err, user);
//     });
//   });

//   // =========================================================================
//   // LOCAL LOGIN =============================================================
//   // =========================================================================
//   passport.use('local-login', new LocalStrategy({
//     // by default, local strategy uses username and password, we will override with email
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
//   },
//     function (req, username, password, done) {
//       if (username)
//         username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

//       // asynchronou
//       process.nextTick(function () {
//         User.findOne({ 'username': username }, function (err, user) {
//           // if there are any errors, return the error
//           if (err)
//             return done(err);

//           // if no user is found, return the message
//           if (!user)
//             return done(null, false);

//           if (!user.validPassword(password))
//             return done(null, false);

//           // all is well, return user
//           else
//             return done(null, user);
//         });
//       });

//     }));

//   // =========================================================================
//   // LOCAL SIGNUP ============================================================
//   // =========================================================================
//   passport.use('local-signup', new LocalStrategy({
//     // by default, local strategy uses username and password, we will override with email
//     usernameField: 'username',
//     passwordField: 'password',
//     passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
//   },
//     function (req, username, password, done) {
//       if (email)
//        username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

//       // asynchronous
//       process.nextTick(function () {
//         // if the user is not already logged in:
//         if (!req.user) {
//           User.findOne({ 'username': username }, function (err, user) {
//             // if there are any errors, return the error
//             if (err)
//               return done(err);

//             // check to see if theres already a user with that email
//             if (user) {
//               return done(null, false);
//             } else {

//               // create the user
//               var newUser = new User();

//               newUser.username= username;
//               newUser.password = newUser.generateHash(password);

//               newUser.save(function (err) {
//                 if (err)
//                   return done(err);

//                 return done(null, newUser);
//               });
//             }

//           });
//           // if the user is logged in but has no local account...
//         } else if (!req.user.username) {
//           // ...presumably they're trying to connect a local account
//           // BUT let's check if the email used to connect a local account is being used by another user
//           User.findOne({ 'username': username }, function (err, user) {
//             if (err)
//               return done(err);

//             if (user) {
//               return done(null, false);
//               // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
//             } else {
//               var user = req.user;
//               user.username = username;
//               user.password = user.generateHash(password);
//               user.save(function (err) {
//                 if (err)
//                   return done(err);

//                 return done(null, user);
//               });
//             }
//           });
//         } else {
//           // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
//           return done(null, req.user);
//         }

//       });

//     }));
// };

// module.exports = strategy;
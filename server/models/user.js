const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// {
// 	email: 'andrew@example.colm',
// 	password: 'dfaskfl;nak;sfdnalnda',
// 	tokens: [{
// 		access: 'auth',
// 		token: 'afsfdajgklsafdkasldfnaskld'
// 	}]
// }

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		// custom email validation
		validate: {
			// validator: (value) => {
			// 	return validator.isEmail(value);
			// },
			validator: validator.isEmail,
			message: `{VALUE} is not a valid email`
		}
	},
	password: {
		type: String,
		require: true,
		minlength: 6
	},
	// array, available in mongodb
	tokens:[{
		access: {
			type: String,
			require: true
		},
		token: {
			type: String,
			require: true
		}
	}]
})

// instance methods 
// attached to a SCHEMA
// arrow methods do not bind 'this' keyword
UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
	// console.log("token" + token);
	// user.tokens = user.tokens.concat([{access, token}]);
	user.tokens.push({access, token});
	// the value will be passed as the next success case for the then call
	return user.save().then(() => {
		return token;
	});
};

// model method
UserSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		// return new Promise((resolve, reject) => {
		// 	reject();
		// })
		return Promise.reject();
	}

	return User.findOne({
		_id: decoded._id,
		// nested objects query
		'tokens.token': token,	
		'tokens.access': 'auth'
	});
};

// override the method
UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

// mongoose middleware
UserSchema.pre('save', function (next) {
	var user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

var User = mongoose.model('User', UserSchema );

module.exports = {User};

// var user = new User({
// 	email: 'andrew@example.com'
// });

// user.save().then((doc) => {
// 	console.log('Saved todo', doc);
// }, (e) => {
// 	console.log('Unable to save todo');
// });

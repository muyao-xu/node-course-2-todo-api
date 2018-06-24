const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
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
}

// override the method
UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

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

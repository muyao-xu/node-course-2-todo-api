const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err, hash) => {
		// console.log(hash);
	});
});

var hashedPassword = '$2a$10$5pLlx85frepLmLUGSr8sFukOV0eToXD/ExMD9ql8SFKRGexZ1yzBO';

bcrypt.compare(password, hashedPassword, (err, result) => {
	console.log(result);
});

// ------------------------JWT
// const {SHA256} = require('crypto-js');
// const jwt = require('jsonwebtoken');

// var data = {
// 	id: 10
// };

// var token = jwt.sign(data, '1234');			//2@ secret
// console.log(token);

// var decoded = jwt.verify(token, '1234');
// console.log('decoded', decoded);


// ------------------replaced by JWT
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message : ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
// 	id: 4
// };
// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString
// };

// // change the data
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
// 	console.log('Data was not changed');
// } else {
// 	console.log('Data was changed. Do not trust!');
// }
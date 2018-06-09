const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '5b1b63c72f8a874c7cda79d2'});

Todo.findByIdAndRemove('5b1b63c72f8a874c7cda79d2').then((todo) => {
	console.log(todo);
});
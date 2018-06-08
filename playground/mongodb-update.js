// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID("5b1ac258cb2ef7ce5f9c329a")
	}, {
		$set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});
	

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID("5b1a10c775efc6b7e1d4dea0")
	}, {
		$inc: {
			age: 1
		}, 
		$set: {
			name: 'Jesscia'
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result)
	});

	// client.close();
});

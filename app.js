var express = require( 'express' );
var mongojs = require( 'mongojs' );
var userdb = mongojs( 'users', ['users'] );
var hobbiesdb = mongojs( 'hobbies', ['hobbies'] );
var statusdb = mongojs( 'status', ['status'] );
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
app.use( express.static( __dirname + '/app' ) );
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.get( '/data/users', function( req, res ) {
	//console.log( 'users GET request received.' );
	userdb.users.find( function( err, docs ) {
		res.json( docs );
	});
});
app.get( '/data/hobbies', function( req, res ) {
	//console.log( 'hobbies GET request received.' );
	hobbiesdb.hobbies.find( function( err, docs ) {
		res.json( docs );
	});
});
app.get( '/data/status', function( req, res ) {
	//console.log( 'hobbies GET request received.' );
	statusdb.status.find( function( err, docs ) {
		res.json( docs );
	});
});
app.get( '/data/user/:id', function( req, res ) {
	//console.log( 'view user info GET request received.' );
	var id = req.params.id;
	userdb.users.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
		res.json(doc);
	});	
});
app.get( '/data/user/edit/:id', function( req, res ) {
	//console.log( 'user info GET request received.' );
	var id = req.params.id;
	userdb.users.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
		res.json(doc);
	});	
});
app.put('/data/user/save-edit/:id', function (req, res) {
	var id = req.params.id;
	var jsonData = {};
	for ( var key in req.body ) {
		jsonData[key] = req.body[key];
	}
	userdb.users.findAndModify(
	{
		query: {
			_id: mongojs.ObjectId(id)
		},
		update: {
			$set: jsonData
		},
		new: true 
	}, function (err, doc) {
		console.log( 'Info added succesfully added to this record.' );
		res.json(doc);
	});
});
app.post('/data/add/user', function (req, res) {
	userdb.users.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});
app.listen( port );
console.log( 'Server running in port: ', port);
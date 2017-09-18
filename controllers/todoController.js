var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
var promise = mongoose.connect('mongodb://test:test@ds141534.mlab.com:41534/todo-db-miguelvalencia2497', {
  useMongoClient: true,
});

//Create a schema
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var itemOne = Todo({
	item: 'watch movie'
}).save();

var data = [
		{item: 'get milk'},
		{item: 'walk dog'},
		{item: 'kick some coding ass'}
	];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    app.get('/todo', function(req, res) {
    	res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res) {
    	data.push(req.body);
    	res.json(data);
    });

    app.delete('/todo/:item', function(req, res) {
    	data = data.filter(function(todo){
    		return todo.item.replace(/ /g, '-') !== req.params.item;
    	});
    	res.json(data);
    });

};
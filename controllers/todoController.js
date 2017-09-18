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

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    app.get('/todo', function(req, res) {
    	//get data from mongodb and pass it to view
    	Todo.find({}, function(err, data){
    		if (err) throw err;
    		res.render('todo', {todos: data});
    	});
    });

    app.post('/todo', urlencodedParser, function(req, res) {
    	//get data from view and add it to monggo db
    	var newTodo = Todo(req.body).save(function(err, data){
    		if (err) throw err;
    		res.json(data);
    	});
    });

    app.delete('/todo/:item', function(req, res) {
    	//delete item from monggodb
    	Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
    		if (err) throw err;
			res.json(data);
    	});
    });

};
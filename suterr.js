var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'classmysql.engr.oregonstate.edu',
  user  : 'cs290_suterr',
  password: '1893',
  database: 'cs290_suterr'
});

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({secret:'SuperSecretPassword'}));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 34692);

app.get('/',function(req,res,next){
  var context = {};
  pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
	context.dataList = rows;
    context.results = JSON.stringify(rows);
    res.render('home', context);
  });
});

app.get('/update',function(req,res,next){
  var context = {};
  pool.query('SELECT * FROM workouts WHERE id=?', [req.query.id], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
	context.dataList = rows;
    context.results = JSON.stringify(rows);
    res.render('update', context);
  });
});

app.get('/save',function(req,res,next){
  var context = {};
    pool.query('SELECT * FROM workouts WHERE id=?', [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
	var curVals = result[0]
	console.log(curVals);
	  pool.query("UPDATE workouts SET name=?, reps=?, weight=?, lbs=?, date=? WHERE id=?", [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.lbs || curVals.lbs, req.query.date || curVals.date, req.query.id], function(err, result){
		if(err){
		  next(err);
		  (console.log("err"));
		  return;
		}
		   res.end();
		});
  });
});

app.get('/insert',function(req,res,next){
	var context = {};
  pool.query("INSERT INTO workouts (`name`,`reps`, `weight`, `lbs`, `date`) VALUES (?,?,?,?,?)", [req.query.name, req.query.reps, req.query.weight, req.query.lbs, req.query.date], function(err, result){
	if(err){
      next(err);
      return;
    }
	pool.query("SELECT * FROM workouts WHERE id=?", [result.insertId], function(err, result){
		if(err){
			next(err);
			return;
		}
		res.send(result[0]);
	});
  });
  
});

app.post('/delete',function(req,res,next){
	//console.log(req.body.id);
  pool.query("DELETE FROM `workouts` WHERE `id` =?", [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
  });
  res.end();
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.redirect('/');
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

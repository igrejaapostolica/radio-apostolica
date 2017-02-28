var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(
	sassMiddleware({
		root: __dirname,
    	src: '/public/sass',
    	dest: '/public/css',
    	debug: true,
    	outputStyle: 'compressed',
    	prefix: '/css'
	})
);

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
var express = require('express'),
    path = require('path'),
    http = require('http'),
    scubagear = require('./routes/scubagears');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3001);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/scubagears', scubagear.findAll);
app.get('/scubagears/:id', scubagear.findById);
app.post('/scubagears', scubagear.addScubagear);
app.put('/scubagears/:id', scubagear.updateScubagear);
app.delete('/scubagears/:id', scubagear.deleteScubagear);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

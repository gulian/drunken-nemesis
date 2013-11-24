
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var account = require('./routes/account');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var debug = require('debug')('app.js')
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var mongo_url = process.env.MONGOD || 'mongodb://localhost/drunken-nemesis',
    database  = mongoose.connect(mongo_url, function(error) {
        if (error) {
            debug(error);
            process.kill();
        }
        http.createServer(app).listen(app.get('port'), function() {
            debug('connected to %s', mongo_url);
        });
    });

app.all('*', function(req, res, n) {
    req.mongoose = mongoose;
    n();
});

app.get('/', routes.index);

app.post(   '/account'     , account.create);
app.get(    '/account/:id' , account.retreive);
app.get(    '/account'     , account.retreive);
app.put(    '/account/:id' , account.update);
app.delete( '/account/:id' , account.delete);

var accountSchema = mongoose.Schema({

    name: String,
    bank: String,
    initialBalance : Number,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    }

});

mongoose.model('account', accountSchema);

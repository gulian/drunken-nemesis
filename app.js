
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var account = require('./routes/account');
var operation = require('./routes/operation');
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
app.put(    '/account' , account.update);
app.delete( '/account/:id' , account.delete);

var accountSchema = mongoose.Schema({

    name: String,
    bank: String,
    initialBalance : Number,
    operations : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'operation'
        }
    ],
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

app.post(   '/operation'     , operation.create);
app.get(    '/operation/:id' , operation.retreive);
app.get(    '/operation'     , operation.retreive);
app.put(    '/operation'     , operation.update);
app.delete( '/operation/:id'     , operation.delete);

var operationSchema = mongoose.Schema({

    name : String,
    amount : Number,
    checked: {
        type: Boolean,
        default: false
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    },
    _account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },

});

mongoose.model('operation', operationSchema);

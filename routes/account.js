var d = require('debug')('account.js')

exports.retreive = function(req, res){

    var request = req.params.id ? { _id : req.params.id } : null ;

    req.mongoose.models.account.find(request).sort({created: -1}).exec(function(error, accounts){
        if(error){
            d(error);
            res.json(500, error);
        } else {
            d(accounts);
            res.json(200, request === null ? accounts : accounts[0] );
        }
    });
};

exports.create = function(req, res){
    new req.mongoose.models.account(req.body).save(function (error, account) {
        if (error)
            res.send(500, error);
        else{
            d(account);
            res.json(200, account);
        }
    });
};

exports.update = function(req, res){
    req.mongoose.models.account.findOne({ _id: req.params.id}, function (error, account) {
        if(error){
            d(error);
            return res.send(500);
        }

        account.name = req.body.name ;
        account.bank = req.body.bank ;
        account.initialBalance = req.body.initialBalance ;

        d(account);

        account.save(function(error){
            if(error){
                d(error);
                res.send(500, error);
            } else {
                d(account);
                res.json(200, account);
            }
        });
    });
};


exports.delete = function(req,res){
    req.mongoose.models.account.findOne({ _id:req.params.id }, function(error, account){
        account.remove(function(error){
            if(error){
                d(error);
                res.send(500, error);
            } else {
                d("%s deleted", req.params.id);
                res.json(200);
            }
        });
    })

};

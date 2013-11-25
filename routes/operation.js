var d = require('debug')('operation.js');

exports.retreive = function(req, res){

    var Operation = req.mongoose.models.operation,
        request = req.params.id ? { _id : req.params.id } : null ;

    Operation
        .find(request)
        .sort({created: -1})
        .exec(
            function(error, operations){
                if(error){
                    d(error);
                    res.json(500, error);
                } else {
                    d(operations);
                    res.json(200, request === null ? operations : operations[0] );
                }
            }
        );

};

exports.create = function(req, res){
    new req.mongoose.models.operation(req.body).save(function (error, operation) {
        if (error)
            res.send(500, error);
        else{
            d(operation);
            res.json(200, operation);
        }
    });
};

exports.update = function(req, res){
    req.mongoose.models.operation.findOne({ _id: req.body._id}, function (error, operation) {
        if(error){
            d(error);
            return res.send(500);
        }

        for(var attribute in req.body){
            if(req.body.hasOwnProperty(attribute)){
                operation[attribute] = req.body[attribute];
            }
        }

        operation.save(function(error){
            if(error){
                d(error);
                res.send(500, error);
            } else {
                d(operation);
                res.json(200, operation);
            }
        });
    });
};


exports.delete = function(req,res){
    req.mongoose.models.operation.findOne({ _id:req.params.id }, function(error, operation){
        operation.remove(function(error){
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

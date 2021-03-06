'use strict';

var mongoose = require('mongoose'),
Task = mongoose.model('Tasks');


exports.list_all_tasks = async function(req, res) {
  const tsk = await Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    
  });
  res.json({results:tsk});
};

exports.create_a_task = function(req, res) {
  const dbTask=req.body;
  Task.create(dbTask,(err,data)=>{
        if (err) {
            console.log("error 500");
            res.status(500).send(err);
        } else {
            console.log("201 ok enviado");
            res.status(201).send({message: "se creo correctamente la tarea",data});
        }
    });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json({task});
  });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id:req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json({task});
  });
};
// Task.remove({}).exec(function(){});
exports.delete_a_task = function(req, res) {

  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

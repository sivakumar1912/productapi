const express = require('express');
const orderRoute = express.Router();

const Order = require('../model/order.model');

orderRoute.route('/').get(function (req, res) {
    Order.find(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

orderRoute.route('/').post(function (req, res) {
    let order = new Order(req.body);

    order.save().then(obj => {
        res.status(200).json({ message: 'Order received successfully' });
    }).catch(err => {
        res.status(400).json({ message: 'unable to take the order' });
    });
});

orderRoute.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Order.findById({ _id: id }, function (err, data) {
        res.json(data);
    });
});

orderRoute.route('/:username').get(function (req, res) {
    let username = req.params.username;
    Order.find({ username : username }, function (err, data) {
        if(err){
            throw err;
        } else{
            res.json(data);
        }
    });
});

orderRoute.route('/:id').patch(function (req, res) {
    let id = req.params.id;
    //validity request
    if(!req.body.orderstatus){
        return res.status(400).json({ message: 'order content can not be empty' });
    }
    
    //find note and update it with the request body
    Order.findByIdAndUpdate(id,{
        orderstatus:req.body.orderstatus || "Accepted"
    }, {new : true })
    .then(obj =>{
        if(!obj) {
            return res.status(400).json({ message: 'order not found with id' + id});
        }
        res.send(obj);
    }).catch(err => {
        if(err.kind === 'id') {
            return res.status(400).json({ message: 'order not found with id' + id});
        }
        return res.status(500).json({ message: 'Error updating with id' + id});
    });
});

orderRoute.route('/:id').delete(function (req, res) {
    let id = req.params.id;

    Order.findByIdAndDelete({ _id: id }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({ message: 'Successfully Deleted the order' });
        }
    });
});
module.exports = orderRoute;

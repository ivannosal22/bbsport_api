
const express = require('express');
const router = express.Router();
const Stadium = require('../models/stadium.js');
const NodeGeocoder = require('node-geocoder');
const moment = require('moment');
const GeoPoint = require('geopoint');


var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyALqmDEpru4ETRhPvAHNZXrMFvI0nOzNG4',
    formatter: null
};
const geocoder = NodeGeocoder(options);


//---------------------- add facility ---------------------------------------------
router.post('/stadium', (req, res) => {
    geocoder.reverse({ lat: parseFloat(req.body.location.lat), lon: parseFloat(req.body.location.lng) }).then((locate) => {
        let place = locate[0].formattedAddress;

        let openTime = moment(Date.parse(req.body.openTime)).format("HH:mm");
        let closeTime = moment(Date.parse(req.body.closeTime)).format("HH:mm");

        let newStadium = new Stadium({
            stadiumName: req.body.stadiumName,
            stadiumDescription: req.body.stadiumDescription,
            openTime: openTime,
            closeTime: closeTime,
            amount: parseFloat(req.body.amount),
            createdDate: new Date(),
            createdBy: req.body.createdBy,
            location: {
                place: place,
                lat: parseFloat(req.body.location.lat),
                lng: parseFloat(req.body.location.lng)
            },
            subscription: req.body.subscription,
            subriptionAmount: req.body.subriptionAmount,
            subriptionMonth: req.body.subriptionMonth,
            facilities: [],
            paymentOption: req.body.paymentOption,
            tax: req.body.tax
        });


        for (let i = 0; i < req.body.facilities.length; i++) {
            newStadium.facilities.unshift(req.body.facilities[i]);
        }

        newStadium.save().then(data => {
            res.json({ code: 200, message: 'added succesfully', data: data });
        }, err => {
            res.json({ code: 400, message: 'error', data: err });
        })
    }, err => {
        res.json({ code: 400, message: 'error', data: err });
    });
});




//----------------------  get facility ---------------------------------------------
router.get('/stadium', (req, res) => {
    let lat = req.query.lat ? req.query.lat : 23.5880;
    let lng = req.query.lng ? req.query.lng : 58.3829;
    var userLocation = new GeoPoint(parseFloat(lat), parseFloat(lng));
    Stadium.find(function (err, data) {
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var destLocation = new GeoPoint(parseFloat(data[i].location.lat), parseFloat(data[i].location.lng));
                data[i].distance = userLocation.distanceTo(destLocation, true);
            }

            data.sort(function (a, b) {
                var keyA = new Date(a.distance),
                    keyB = new Date(b.distance);
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            res.json(data);
        }
    }, err => {
        res.json(err);
    });
});


//----------------------  get facility ---------------------------------------------
router.get('/stadiumById', (req, res) => {
    let lat = req.query.lat ? req.query.lat : 23.5880;
    let lng = req.query.lng ? req.query.lng : 58.3829;
    var userLocation = new GeoPoint(parseFloat(lat), parseFloat(lng));
    Stadium.find({ _id: req.query.id }).then(data => {
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var destLocation = new GeoPoint(parseFloat(data[i].location.lat), parseFloat(data[i].location.lng));
                data[i].distance = userLocation.distanceTo(destLocation, true);
            }

            data.sort(function (a, b) {
                var keyA = new Date(a.distance),
                    keyB = new Date(b.distance);
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            res.json(data);
        }
    });
});


router.delete('/stadium/:id', (req, res, next) => {
    Stadium.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});


module.exports = router;
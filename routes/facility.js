
const express = require('express');
const router = express.Router();
const Facility = require('../models/facility.js');



//---------------------- add facility ---------------------------------------------
router.post('/facility', (req, res) => {

    addFacility(req).then(data => {
        res.json({ code: 200, msg: "added succesfully" });
    }).catch((err) => {
        res.json(err);
    });
});


async function addFacility(req) {
    let newFacility = new Facility({
        facilityName: req.body.facilityName,
    });

    let saved = await newFacility.save();
    return (saved);
}


//----------------------  get facility ---------------------------------------------
router.get('/facility', (req, res) => {
    Facility.find(function (err, data) {
        res.json(data);
    });
});

module.exports = router;
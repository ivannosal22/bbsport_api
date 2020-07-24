const express = require('express');
const router = express.Router();
const Stadium = require('../models/stadium');
const Booking = require('../models/booking');


//---------------------- register new user ---------------------------------------------
router.post('/booking', (req, res) => {
    checkBookingTimeAvailable(req).then(data => {
        if (data == 1) {
            saveNewBooking(req).then(data => {

            });
        }
    });
});


//---------------------- check booking available ---------------------------------------------
async function checkBookingTimeAvailable(req) {
    let returnData;
    let data = await Booking.find({ stadiumId: req.body.stadiumId });
    if (data.length == 0) {
        returnData = 1;
    } else {
        for (let i = 0; i < data.length; i++) {

        }
    }

    return returnData;
}


// -------------------- new booking adding ----------------------------------
async function saveNewBooking() {
    let newBooking = new Booking({
        userId: req.body.userId,
        stadiumId: req.body.stadiumId,
        bookedDate: new Date(),
        bookedStartTime: req.body.bookedStartTime,
        bookedEndTime: req.body.bookedEndTime
    });
    let saved = await newBooking.save();
    return (saved);
}


// -------------------------- Get available time --------------------------------
router.post('/booking/getBookingAvailableTime', (req, res) => {
    Stadium.find({ _id: req.body.stadiumId }).then(data => {
        let diffrentTime = parseInt(data[0].closeTime) - parseInt(data[0].openTime);
        availableTimes = [];
        for (var i = 0; i <= diffrentTime; i++) {

        }
        res.json(availableTimes);
    });
});



module.exports = router;
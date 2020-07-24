
const express = require('express');
const router = express.Router();
const Organize = require('../models/organize');
const Register = require('../models/register');


//---------------------- add facility ---------------------------------------------
router.post('/organize', (req, res) => {
    addOrganize(req).then(data => {
        res.json({ code: 200, msg: "added succesfully", data: data });
    }).catch((err) => {
        res.json(err);
    });
});


async function addOrganize(req) {
    let newOrganize = new Organize({
        organizerId: req.body.organizerId,
        eventName: req.body.eventName,
        description: req.body.description,
        eventDate: req.body.eventDate,
        eventStartTime: req.body.eventStartTime,
        eventEndTime: req.body.eventEndTime,
        stadiumId: req.body.stadiumId,
        requestedUsers: [],
        invitedUser: [],
        type: req.body.type
    });

    let saved = await newOrganize.save();
    return (saved);
}


//----------------------  get facility ---------------------------------------------
router.get('/organize', (req, res) => {
    getUser().then(data => {
        res.json(data);
    })
});

async function getUser() {
    let result = await Organize.find();
    for (let i = 0; i < result.length; i++) {
        result[i].user = await Register.find({ _id: result[i].organizerId });
    }
    return result;
}

router.post('/organizeByStadium', (req, res) => {
    Organize.find({ stadiumId: req.body.stadiumId }).then(data => {
        res.json(data);
    });
});


// ------------------ organization by id ------------------------
router.post('/eventById', (req, res) => {
    Organize.find({ _id: req.body.id }).then(data => {
        res.json(data[0]);
    });
});


router.post('/joinPublicEvent', (req, res) => {
    Organize.find({ _id: req.body.id }).then(data => {
        let accesptedUser = {
            userId: req.body.userId,
        }
        data[0].acceptedUser.unshift(accesptedUser);
        data[0].save().then(responce => {
            res.json(responce);
        });
    });
});


router.post('/inviteFriends', (req, res) => {
    Register.find({ phoneNumber: req.body.phoneNumber }).then(data => {
        if (data.length == 0) {
            res.json({ code: 122, message: "no user found" })
        } else {
            Organize.find({ _id: req.body.eventId }).then(event => {
                let invitedUser = {
                    userId: data[0]._id
                }
                event[0].invitedUser.unshift(invitedUser);
                event[0].save().then(responce => {
                    res.json({ code: 200, data: responce });
                });
            });
        }
    });
});



// ------------------ add comments organization ------------------------
router.post('/addEventComments', (req, res) => {
    Organize.find({ _id: req.body.id }).then(data => {
        let comment = {
            username: req.body.username,
            userImage: req.body.userImage,
            comments: req.body.comments,
            commentImage: req.body.commentImage
        }
        data[0].comments.unshift(comment);
        data[0].save().then(event => {
            res.json({ code: 200, data: event });
        })
    });
});




module.exports = router;



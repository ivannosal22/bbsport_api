const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Register = require('../models/register.js');
const Meta = require('../models/meta.js');
const Nexmo = require('nexmo');


const nexmo = new Nexmo({
    apiKey: 'c516bbff',
    apiSecret: 'O5XYAAvpoEYXcmwA',
});

//---------------------- login---------------------------------------------
router.post('/login', (req, res) => {
    phoneNumberExist(req).then(data => {
        if (data.length !== 0) {
            res.json({ code: 200, msg: "login succesfull", data: data[0] });
        } else {
            res.json({ code: 303, msg: "phone number not exist" });
        }
    }).catch((err) => {
        res.json(err);
    });
});

//---------------------- check phone number exist ---------------------------------------------
router.post('/check-phonenumber-exist', (req, res) => {
    phoneNumberExist(req).then(data => {
        if (data.length !== 0) {
            res.json({ code: 304, msg: "phone number exist" });
        } else {
            res.json({ code: 303, msg: "phone number not exist" });
        }
    });
});


//---------------------- register new user ---------------------------------------------
router.post('/register', (req, res) => {
    newRegister(req).then(data => {
        res.json({ code: 304, msg: "registration successful", data: data });
    });
});

async function phoneNumberExist(req) {
    let data = Register.find({ phoneNumber: req.body.phoneNumber });
    return data;
}

async function newRegister(req) {
    let newUser = new Register({
        role: req.body.role,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        otpVerified: req.body.otp
    });

    let saved = await newUser.save();
    return (saved);
}


router.post('/addFavorite', (req, res) => {
    phoneNumberExist(req).then(data => {
        let isExisting = false;
        for (let i = 0; i < data[0].favorites.length; i++) {
            if (data[0].favorites[i] === req.body.stdiumId) {
                isExisting = true;
                break;
            }
        }
        if (!isExisting) {
            data[0].favorites.unshift(req.body.stdiumId);
        }
        data[0].save().then(data => {
            res.json({ code: 200, data: data });
        });
    });
});


router.post('/removeFavorite', (req, res) => {
    phoneNumberExist(req).then(data => {
        data[0].favorites = data[0].favorites.filter((item) => {
            if (item !== req.body.stdiumId) return item;
        });
        
        data[0].save().then(data => {
            res.json({ code: 200, data: data });
        });
    });
});


router.post('/editUser', (req, res) => {
    phoneNumberExist(req).then(data => {

        data[0].name = req.body.name;
        data[0].favoriteClub = req.body.favoriteClub;
        data[0].favoriteTeam = req.body.favoriteTeam;
        data[0].age = req.body.age;
        data[0].position = req.body.position;
        data[0].email = req.body.email;
        if (req.body.profilePic != null && req.body.profilePic != "") {
            data[0].profilePic = req.body.profilePic;
        }

        data[0].save().then(data => {
            res.json({ code: 200, data: data });
        });
    });
});


// ------------------------- get array users by id ------------------------------
router.post('/getUserArray', (req, res) => {
    let arrayUser = [];
    if (req.body.users.length == 0) {
        res.json(arrayUser);
    } else {
        for (var i = 0; i < req.body.users.length; i++) {
            Register.find({ _id: req.body.users[i].userId }).then(data => {
                arrayUser.unshift(data[0]);
                if (arrayUser.length === req.body.users.length) {
                    res.json(arrayUser);
                }
            });
        }
    }
});


// ---------------- sent OTP -------------------
router.post('/sentOTP', (req, res) => {
    res.json({ code: 200, message: { request_id: '2222222', status: '0' } });
    // nexmo.verify.request({
    //     number: req.body.phoneNumber,
    //     brand: 'BB Sports',
    //     code_length: '4'
    // }, (err, result) => {
    //     if (err) {
    //         res.json({ code: 400, message: err });
    //     }
    //     res.json({ code: 200, message: result });
    // });
});


router.post('/testotp', (req, res) => {
});


// ---------------- verify OTP -------------------
// router.post('/verifyOTP', (req, res) => {
//     nexmo.verify.check({
//         request_id: req.body.request_id,
//         code: req.body.code
//     }, (err, result) => {
//         if (err) {
//             res.json({ code: 400, message: err });
//         }
//         res.json({ code: 200, message: result });
//     });
// });


router.post('/verifyOTP', (req, res) => {
    if (req.body.code == '1234') {
        res.json({ code: 200, message: { status: '0' } });
    } else {
        res.json({ code: 400, message: { status: '1' } });
    }
});

router.post('/updateMeta', (req, res) => {
    getMeta(req).then(metaList => {
        if (metaList.length == 0) {
            let newMeta = new Meta({
                metaKey: req.body.metaKey,
                metaValue: req.body.metaValue,
            });
        
            let saved = await newMeta.save();
            res.json({ code: 200, msg: "success" });
        } else {
            metaList[0].metaValue = req.body.metaValue;
            metaList[0].save().then(() => {
                res.json({ code: 200, msg: "success" });
            });
        }
    });
});

router.post('/getMeta', (req, res) => {
    res.json({ code: 200, metaValue: "aaaa" });
    /* getMeta(req).then(metaList => {
        if (metaList.length == 0) {
            res.json({ code: 200, metaValue: "" });
        } else {
            res.json({ code: 200, metaValue: metaList[0].metaValue });
        }
    }); */
});

async function getMeta(req) {
    let data = await Meta.find({ metaKey: req.body.metaKey });
    return data;
}

module.exports = router;
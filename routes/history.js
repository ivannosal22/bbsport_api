const express = require('express');
const router = express.Router();
const History = require('../models/history.js');
const Organize = require('../models/organize');


router.get('/history', (req, res) => {
    let datas = [];
    History.find({ userId: req.query.userId }, function (err, data) {
        if (data.length !== 0) {
            for (let i = data[0].history.length - 1; i >= 0; i--) {
                Organize.find({ _id: data[0].history[i].activityId }).then(org => {
                    datas.unshift(org[0]);
                    if (datas.length === data[0].history.length) {
                        res.json({ code: 200, data: datas });
                    }
                });
            }
        } else {
            res.json({ code: 200, data: datas });
        }
    });
});

//---------------------- add history ---------------------------------------------
router.post('/history', (req, res) => {
    userAlreadyExistHistory(req).then(userList => {
        if (userList.length == 0) {
            addHistory(req).then(() => {
                res.json({ code: 200, msg: "added succesfully" });
            }).catch((err) => {
                res.json(err);
            });
        } else {
            userList[0].history.unshift({ activityId: req.body.activityId });
            userList[0].save().then(() => {
                res.json({ code: 200, msg: "updated succesfully" });
            });
        }
    });

});


async function addHistory(req) {
    let ids = [{ activityId: req.body.activityId }];
    let newHistory = new History({
        userId: req.body.userId,
        history: ids
    });

    let saved = await newHistory.save();
    return (saved);
}




async function userAlreadyExistHistory(req) {
    let data = await History.find({ userId: req.body.userId });
    return data;
}

module.exports = router;
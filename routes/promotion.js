
const express = require('express');
const router = express.Router();
const Promotion = require('../models/promotion');



//---------------------- add Promotion ---------------------------------------------
router.post('/promotion', (req, res) => {
    addPromotion(req).then(data => {
        res.json({ code: 200, msg: "added succesfully" });
    }).catch((err) => {
        res.json(err);
    });
});


async function addPromotion(req) {
    let newPromotion = new Promotion({
        promotionText: req.body.promotionText,
        promotionStadiumId: req.body.promotionStadiumId,
        promotionImage: req.body.promotionImage
    });

    let saved = await newPromotion.save();
    return (saved);
}


//----------------------  get Promotion ---------------------------------------------
router.get('/promotion', (req, res) => {
    Promotion.find(function (err, data) {
        res.json(data);
    });
});

module.exports = router;
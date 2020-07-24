const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const config = require('../config');


const s3 = new AWS.S3({
    accessKeyId: config.aws_id,
    secretAccessKey: config.aws_secret
});

router.post('/upload', (req, res) => {
    res.json({ code: 200 });
});


//---------------------- register new user ---------------------------------------------
router.post('/upload-image', (req, res) => {
    let base64 = req.body.image;
    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = base64.split(';')[0].split('/')[1];
    const userId = req.body.userId;

    const params = {
        Bucket: config.aws_bucket_name,
        Key: `${userId}.${type}`, // type is not required
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64', // required
        ContentType: `image/${type}` // required. Notice the back ticks
    }


    //Uploading files to the bucket
    s3.upload(params, (err, data) => {
        if (err) {
            res.json({ msg: 'error' + err, code: 401 });
        }
        res.json({ msg: 'success', code: 200, location: data.Location });
    });
});



module.exports = router;
const dotenv = require('dotenv');
dotenv.config();
const config = {
    aws_id: process.env.AWS_ID,
    aws_secret: process.env.AWS_SECRET,
    aws_bucket_name: process.env.AWS_BUCKET_NAME
};

module.exports = config
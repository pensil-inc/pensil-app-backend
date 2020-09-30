const express = require('express');
const { response } = require('..');

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({
        "Hello": "World"
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();

//@route GET api/users/test
//@desc Tests users route
//@access Public

router.get('/test', (req, res) => res.json({ msg: "users works" })); //this is not just referring to '/test' route but '/api/users/test' due to middlewareo n server.js

module.exports = router;
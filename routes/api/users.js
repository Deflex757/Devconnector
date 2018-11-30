const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcript = require('bcryptjs');
//load User model
const User = require('../models/User')

//@route GET api/users/test
//@desc Tests users route
//@access Public

router.get('/test', (req, res) => res.json({ msg: "users works" })); //this is not just referring to '/test' route but '/api/users/test' due to middlewareo n server.js

//
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already exusts' });
        } else {
            const avatar = gravatar.url(req.bidy.email, {
                s: '200',//size
                r: 'pg', //rating
                d: 'mm'//default

            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });
            //hash the pw, save to db
            bcript.genSalt(10, (err, salt) => {
                bcript.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        }
    });

});
module.exports = router;
const express = require('express');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const  userModel= require('../models/user.model');
const config = require('../config/default.json');
const restrict = require('../middlewares/auth.mdw');


const router = express.Router();

router.get('/login',async function (req, res){
    res.render('vAccount/login', {
        layout: false
    });
})

router.post('/login', async function (req, res){
    const user = await userModel.singleByUserName(req.body.username);
    if(user === null){
        return res.render('vAccount/login', {
            layout: false,
            err: 'Lỗi tài khoản hoặc mật khẩu'
        })
    }

    const rs = bcrypt.compareSync(req.body.password, user.password);
    if(rs === false){
        return res.render('vAccount/login', {
            layout: false,
            err: 'Lỗi tài khoản hoặc mật khẩu'
        })
    }

    delete user.password;
    req.session.isAuthenticated = true;
    req.session.authUser = user;

    const url = req.query.retUrl || '/';

    res.redirect('/');
})

router.post('/logout' , restrict, function (req, res){
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);

})

router.get('/register',async function (req, res){
    res.render('vAccount/register',{layout: false});
})

router.post('/register',async function (req, res){
    const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const password = bcrypt.hashSync(req.body.password, config.authentication.saltRounds);
    const entity = {
        username: req.body.username,
        password,
        name: req.body.name,
        email: req.body.email,
        dob,
        permission:0
    }

    await userModel.add(entity);

    res.render('vAccount/register',{layout: false});
})


router.get('/profile',restrict, async function (req, res){
    res.render('vAccount/profile');
})


module.exports = router;











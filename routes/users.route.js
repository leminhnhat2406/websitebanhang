const express = require('express');
const userModel = require('../models/user.model');
const cmtmodel = require('../models/cmt.model');

const router = express.Router();

router.get('/',async function (req, res){

    const list = await userModel.all();
    
    res.render('vAdmin/list', {
        users: list,
        empty: list.length === 0
    });
})

router.post('/delete',async function (req, res){
    await userModel.delete(req.body.id, req.body.username);

    res.redirect('/admin/users');
})



module.exports = router;


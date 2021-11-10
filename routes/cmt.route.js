const express = require('express');
const cmtmodel = require('../models/cmt.model');

const router = express.Router();

router.get('/',async function (req, res){

    const list = await cmtmodel.all();
    
    res.render('vAdmin/cmt', {
        prod_comments: list,
        empty: list.length === 0
    });
})



module.exports = router;


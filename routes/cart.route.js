const express = require('express');
const cartModel = require('../models/cart.model');
const productModel = require('../models/product.model');

const router = express.Router();

router.get('/',async function (req, res){
    // throw new Error('xxxxxx')(throw lỗi để kiểm tra)

    const list = await cartModel.all();
    
    res.render('vCart/cart', {
        layout: false,
        cart: list,
        empty: list.length === 0
    });
})

router.get('/addtocart', function (req, res){
    res.render('vCart/cart',{layout: false});
})





module.exports = router;


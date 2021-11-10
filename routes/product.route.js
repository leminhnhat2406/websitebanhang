const express = require('express');
const productModel = require('../models/product.model');

const router = express.Router();

router.get('/',async function (req, res){

    const list = await productModel.all();
    
    res.render('vProduct/list', {
        products: list,
        empty: list.length === 0
    });
})

router.get('/add', function (req, res){
    res.render('vProduct/add');
})

router.post('/add',async function (req, res){
    const entity = {
        ProName: req.body.ProName,
        TinyDes: req.body.TinyDes,
        Price: req.body.Price,
        CatID: req.body.CatID,
        Quantity: req.body.Quantity
    }

    await productModel.add(entity);

    res.render('vProduct/add');
})

module.exports = router;


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

// router.post('/add',async function (req, res){
//     const entity = {
//         namePro : req.body.txtProductName,
//         price : req.body.txtPrice,
//         description : req.body.txtDescription,
//         category_id : req.body.txtCategory_id
//     }
//     const rs = await productModel.add(entity);
//     console.log(rs);
//     res.render('vProduct/add');
// })


module.exports = router;


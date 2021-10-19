const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();

router.get('/',async function (req, res){
    // throw new Error('xxxxxx')(throw lỗi để kiểm tra)

    const list = await categoryModel.all();
    
    res.render('vCategories/list', {
        categories: list,
        empty: list.length === 0
    });
})

router.get('/add', function (req, res){
    res.render('vCategories/add');
})

router.post('/add',async function (req, res){
    // const entity = {
    //     name: req.body.txtCategoryName
    // }(đặt biến cho entity nhưng chỉ có 1 nên không có cũng được)
    await categoryModel.add(req.body);

    res.render('vCategories/add');
})

router.get('/edit',async function (req, res){
    const id = +req.query.id || - 1;
    const rows = await categoryModel.single(id);
    if(rows.length === 0)
        return res.send('xxxxx')
    const category = rows[0];

    res.render('vCategories/edit',{ category });
})

router.post('/delete',async function (req, res){
    await categoryModel.delete(req.body.CatID);

    res.redirect('/admin/categories');
})

router.post('/update',async function (req, res){
    await categoryModel.patch(req.body);

    res.redirect('/admin/categories');
})




module.exports = router;


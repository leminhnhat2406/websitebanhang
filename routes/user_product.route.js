const express = require('express');
const productModel = require('../models/product.model');
const cmtModel = require('../models/cmt.model');
const config = require('../config/default.json');
const  userModel= require('../models/user.model');

const router = express.Router();

router.get('/byCat/:catId',async function (req, res){

    for (const c of res.locals.lcCategories) {
        if(c.CatID === +req.params.catId){
            c.isActive = true;
        }
    }

    const page = +req.query.page || 1;
    if(page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limit;
    
    const[list, total] = await Promise.all([
        productModel.pageByCat(req.params.catId, config.pagination.limit, offset),
        productModel.countByCat(req.params.catId)
    ]);

    const nPages = Math.ceil(total / config.pagination.limit);
    const page_items = [];
    for(let i = 1; i <= nPages; i++)
    { 
        const item = 
            {
                value: i,
                isActive: i === page
            }
            page_items.push(item);
    }
    
    res.render('vProduct/byCat', {
        products: list,
        empty: list.length === 0, 
        page_items,
        prev_value:page - 1,
        next_value:page + 1,
        can_go_prev:page > 1,
        can_go_next:page < nPages
    });

    
})


router.get('/search',async function (req, res){

    console.log(req.query)
    searchQuery = req.query.searchQuery
    for (const c of res.locals.lcCategories) {
        if(c.CatID === +req.params.catId){
            c.isActive = true;
        }
    }

    const page = +req.query.page || 1;
    if(page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limit;
    const[list, total] = await Promise.all([
        productModel.pageSearchByName(searchQuery, config.pagination.limit, offset),
        productModel.countByName(searchQuery)
    ]);

    const nPages = Math.ceil(total / config.pagination.limit);
    const page_items = [];
    for(let i = 1; i <= nPages; i++)
    { 
        const item = 
            {
                i: i,
                value: 'search?searchQuery=' + searchQuery + '&&page=' + (i),
                isActive: i === page
            }
            page_items.push(item);
    }
    
    res.render('vProduct/bySearch', {
        products: list,
        empty: list.length === 0, 
        page_items,
        prev_value:'search?searchQuery=' + searchQuery + '&&page=' + (page - 1),
        next_value:'search?searchQuery=' + searchQuery + '&&page=' + (page + 1),
        can_go_prev:page > 1,
        can_go_next:page < nPages
    });

    
})

router.post('/addComment', async function (req, res){
    prodID = req.body.prodId
    cmt = req.body.comment 
    currentUser = req.session.authUser
    userID = currentUser.id
    await cmtModel.add({
        'userID': userID,
        'prodID': prodID,
        'cmt': cmt,
        'ts': new Date()
    })
    res.redirect('details?id=' + prodID);
})

router.get('/details',async function (req, res){
    const ProID = +req.query.id || - 1;
    const rows = await productModel.deltail(ProID);
    const products = rows[0];
    const cmts = await cmtModel.allByProductId(products.ProID)
    for(var i in cmts) {
        user = await userModel.single(cmts[i].userID)
        cmts[i].userName = user[0].username
    }
    products.cmts = cmts
    console.log(products)

    res.render('vProduct/details',{ products });
})




module.exports = router;
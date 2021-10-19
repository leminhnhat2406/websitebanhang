const express = require('express');
const productModel = require('../models/product.model');
const config = require('../config/default.json');

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
    //Gọi hàm  allByCat
    // const list = await productModel.allByCat(req.params.catId);

    //const list = await productModel.pageByCat(req.params.catId, config.pagination.limit, offset);
    const[list, total] = await Promise.all([
        productModel.pageByCat(req.params.catId, config.pagination.limit, offset),
        productModel.countByCat(req.params.catId)
    ]);
    //const total = await productModel.countByCat(req.params.catId);

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



router.get('/details',async function (req, res){
    const ProID = +req.query.id || - 1;
    const rows = await productModel.deltail(ProID);
    // if(rows.length === 0)
    //     return res.send('sai lầm')
    const products = rows[0];

    res.render('vProduct/details',{ products });
})

router.get('/search',async function (req, res){
    
})


module.exports = router;










// xử lí khi có nhiều trang 
// const nPages = 30;
    // const pg = 15;
    // const disableItem ={
    //     value: '...',
    //     isActive: false,
    //     isDisabled: true
    // }

    // for(let i = 1; i <= 5; i++)
    // {
    //     const item = 
    //         {
    //             value: i,
    //             isActive: i === pg
    //         }
    //         page_items.push(item);
    // }

    // page_items.push(disableItem);

    // for(let i = pg - 3; i <= pg + 3; i++)
    // {
    //     const item = 
    //         {
    //             value: i,
    //             isActive: i === pg
    //         }
    //         page_items.push(item);
    // }

    // page_items.push(disableItem);

    // for(let i = nPages - 5; i <= nPages; i++)
    // {
    //     const item = 
    //         {
    //             value: i,
    //             isActive: i === pg
    //         }
    //         page_items.push(item);
    // }

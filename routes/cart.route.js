const express = require('express');
const cartModel = require('../models/cart.model');
const productModel = require('../models/product.model');

const router = express.Router();

router.get('/',async function (req, res){
    if(req.session.isAuthenticated) {
    	console.log('OK')
	    currentUser = req.session.authUser
	    userId = currentUser.id

	    const list = await cartModel.allByCartId(userId);
	    sumMoney = 0
	    for(var i in list) {
	    	const rows = await productModel.deltail(list[i]['ProID'])
			const product = rows[0]
	    	list[i]['ProName'] = product.ProName
	    	sumMoney += list[i]['Price']
	    }

	    console.log(list);

	    res.render('vCart/cart', {
	        layout: false,
	        cart: list,
	        sumMoney: sumMoney,
	        empty: list.length === 0
	    });
    } else {
	    res.render('vCart/cart', {
	    	layout: false
	    });
	}
})

router.get('/delete', async function (req, res){
	if(req.session.isAuthenticated) {
		currentUser = req.session.authUser
		transId = req.query.transactionId
		userId = currentUser.id
		console.log(currentUser)
		await cartModel.deleteByTransId(
			userId,
			transId
		);
	} 
    res.redirect('/cart');
})

router.get('/addtocart', async function (req, res){
	if(req.session.isAuthenticated) {
		currentUser = req.session.authUser
		productId = req.query.id
		const rows = await productModel.deltail(productId)
		const product = rows[0]
		userId = currentUser.id
		console.log(currentUser)
		console.log(product)
		productPrice = product.Price
		await cartModel.add({
			CartID: userId,
			ProId: productId,
			Price: productPrice
		});
	} 
    res.redirect('/cart');
})





module.exports = router;


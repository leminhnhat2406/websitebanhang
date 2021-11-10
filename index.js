const express = require('express')
require('express-async-errors')
const { allWithDetails } = require('./models/category.model')
const app = express()
const port = 3000

app.use(express.urlencoded({
  extended: true
}));

app.use('/public', express.static('public'));

require('./middlewares/session.mdw')(app);
require('./middlewares/view.mdw')(app);
require('./middlewares/locals.mdw')(app);

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/admin', (req, res) => {
  res.render('admin')
})

// app.get('/', (req, res) => {
//   res.render('')
// })

app.use('/admin/categories', require('./routes/category.route'));
app.use('/admin/products', require('./routes/product.route'));
app.use('/admin/users', require('./routes/users.route'));
app.use('/admin/cmt', require('./routes/cmt.route'));

app.use('/account', require('./routes/account.route'));
app.use('/products', require('./routes/user_product.route'));
app.use('/cart', require('./routes/cart.route'));

// app.use('/admin_account', require('./routes/admin_account'));

app.use(function(req, res){
  res.render('404', {layout: false});
})

app.use(function(err , req, res, next){
  console.error(err.stack);
  res.status(500).render('500', {layout: false});
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
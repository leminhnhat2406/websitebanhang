const db = require('../utils/db');

const TBL_CART = 'cart';

module.exports = {
    all: function(){
        return db.load(`SELECT * FROM ${TBL_CART}`);
    },

    allWithDetails: function(){
        return db.load(`
        select c.*, count(p.CartID) as num_of_cart
        from ${TBL_CART} c left join products p on c.ProID = p.ProID
        group by c.ProID, c.ProName
        order by ProID`);
    },

    single: function(id){
        return db.load(`SELECT * FROM ${TBL_CART} where ProID = ${id}` );
    },

    add: function(entity){
        return db.add(TBL_CART, entity);
    },

    patch: function(entity){
        const condition = {
            ProID: entity.ProID
        }
        delete entity.ProID;
        return db.patch(TBL_CART, entity, condition);
    },

    delete: function(id){
        const condition = {
            ProID: id
        }
        return db.delete(TBL_CART, condition);
    }
};
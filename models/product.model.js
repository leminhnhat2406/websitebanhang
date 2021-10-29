const db = require('../utils/db');

const TBL_PRODUCTS = 'products';

module.exports = {
    all: function(){
        return db.load(`SELECT * FROM ${TBL_PRODUCTS}`);
    },

    allByCat: function(catId){
        return db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE CatID = ${catId}`);
    },

    pageByCat: function(catId, limit, offset){
        return db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE CatID = ${catId} limit ${limit} offset ${offset}`);
    },

    countByCat: async function(catId){
        const rows = await db.load(`SELECT COUNT(*) AS total FROM ${TBL_PRODUCTS} WHERE CatID = ${catId}`);
        return rows[0].total;
    },

    pageSearchByName: function(name, limit, offset) {
        return db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE ProName LIKE '%${name}%' limit ${limit} offset ${offset}`);
    },

    countByName: async function(name){
        const rows = await db.load(`SELECT COUNT(*) AS total FROM ${TBL_PRODUCTS} WHERE ProName LIKE '%${name}%'`);
        return rows[0].total;
    },

    deltail: function(ProID){
        return db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE ProID = ${ProID}`);
    },
};
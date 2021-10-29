const db = require('../utils/db');

const TBL_COMMENTS = 'prod_comments';

module.exports = {
    all: function(){
        return db.load(`SELECT * FROM ${TBL_COMMENTS}`);
    },

    allByProductId: function(prodID) {
        return db.load(`SELECT * FROM ${TBL_COMMENTS} WHERE prodID = ${prodID} ORDER BY ts DESC`);
    },

    add: function(entity){
        return db.add(TBL_COMMENTS, entity);
    }

};
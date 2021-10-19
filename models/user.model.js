const db = require('../utils/db');

const TBL_USERS = 'users';

module.exports = {
    all: function(){
        return db.load(`SELECT * FROM ${TBL_USERS}`);
    },
    single: function(id){
        return db.load(`SELECT * FROM ${TBL_USERS} where id = ${id}` );
    },

    singleByUserName: async function(username){
        const rows = await db.load(`SELECT * FROM ${TBL_USERS} where username = '${username}'` );
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    add: function(entity){
        return db.add(TBL_USERS, entity);
    },

    patch: function(entity){
        const condition = {
            id: entity.id
        }
        delete entity.id;
        return db.patch(TBL_USERS, entity, condition);
    },

    delete: function(id){
        const condition = {id}
        return db.delete(TBL_USERS, condition);
    }
};
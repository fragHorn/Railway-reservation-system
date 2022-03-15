const { getDB } = require('../database/db');

module.exports = class User{
    constructor(email, password, name, mobileNo){
        this.name = name;
        this.email = email;
        this.mobileNo = mobileNo;
        this.password = password;
    };

    save(){
        const db = getDB();
        return db.collection('users').insertOne(this);
    }
    
    static findUser(emailId){
        const db = getDB();
        return db.collection('users').findOne({
                email: emailId
        });
    }
}
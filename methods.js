const mysql = require("mysql");

const db = null;
function createDbConn(){
    db = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"test"
    });
    
    db.connect((err)=>{
        if(err){
            console.log("error ",err);
        }
        console.log("Connected Successfully !");
    });
}
module.exports = db;
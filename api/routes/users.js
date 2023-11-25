const express = require('express');
const router = express.Router();
const mysql = require('mysql');


router.get("/",(req, res)=>{
    getUsers(res);
    // res.status(200).json({
    //     status:200,
    //     messege: "User list is accessed !",
    //     results: userDetails
    // })
});

router.post("/",(req, res)=>{
        const name=  req.body.uname;
        const email =  req.body.email;
        createUser(res,name, email);
});

router.get("/:userId",(req, res)=>{
    const uid = req.params.userId;
    getParticular(res, uid);
});

router.patch("/:userId",(req, res)=>{
    const uid = req.params.userId;
    const uname = req.body.name;
    const email = req.body.email;
    updateUser(res, uid,uname, email);
});

router.delete("/:userId",(req, res)=>{
    const uid = req.params.userId;
    deleteUser(res,uid);
});

function updateUser(response, userId, username, email){

    // const db = mysql.createConnection({
    //     host:"localhost",
    //     user:"root",
    //     password:"",
    //     database:"test"
    // });

    // db.connect((err)=>{
    //     if(err){console.log("error ",err);}
    // });
    if(username === undefined){
        if(email === undefined){
            console.log("No changes occured !");
        }else{
            console.log("email will be updated !");
        }
    }else{
        if(email === undefined){
            console.log("username will be updated !");
        }else{
            console.log("both username and email will be updated !");
        }
    }
}

function getParticular(response, userId){
    const db = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"test"
    });

    db.connect((err)=>{
        if(err){console.log("error ",err);}
    });
    const query = `SELECT * FROM users WHERE uid = '${userId}'`;
    db.query(query, (err, res)=>{
        if(err){
            response.status(500).json({error:"Internal server error !"});
        }
            
            const data = JSON.parse(JSON.stringify(res));
            const array = Object.keys(data);
            if(array.length === 0){
                response.status(404).json({error:"No records found !"});
            }else{
                response.status(404).json({
                    messege:`Details of user ${userId}`,
                    result: data
                });
            }
    })
}
function deleteUser(response,userId){
    const db = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"test"
    });

    db.connect((err)=>{
        if(err){console.log("error ",err);}
        console.log("Connected Successfully !");
    });
    const query = `DELETE FROM users WHERE uid = '${userId}'`;
    db.query(query, (err, res)=>{
        if(err){
            response.status(404).json({error:"No record found !"});
        }else{
            response.status(200).json({
                messege: `User deleted UID : ${userId}`
            })
        }
    })
}
function getUsers(response){

    const db = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"test"
    });

    db.connect((err)=>{
        if(err){console.log("error ",err);}
        console.log("Connected Successfully !");
    });
    const query = "SELECT * FROM users";
    db.query(query, (err, res)=>{
    if(err){
        response.status(500).json({
            messege:"Internal server error !",
        })
    }else{
        const userList = JSON.parse(JSON.stringify(res));
        response.status(200).json({
            messege:"Registered users are listed bellow !",
            result: userList
        });
    }
})
}
function createUser(resp, uname, email){
    const db = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"test"
    });
    db.connect((err)=>{
        if(err) console.log("Internal server error !");
    });
    const query = `INSERT INTO users (name, email) VALUES ('${uname}','${email}')`;
    db.query(query, (err, res)=>{
        if(err) {
            resp.status(500).json({messege:"Internal server error !"})
        }else{
        resp.status(201).json({
            messege:"New user created !"
        });
    }
    })
}

module.exports = router;
var express =require('express');
var router =express.Router();
var fs=require('fs');
var db=require('../db.js');
const bodyParser = require('body-parser');


router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', '3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json())

router.get('/info',function(req,res,next){
    let sql='SELECT hid,address,houseType,area,price FROM houseinfo';
    db.query(sql,(err,data,fields)=>{
        if(err){
            console.log(err);
            res.json({
                status:0,
                msg:'获取数据失败'
            });
            return;
        }else{
            console.log(data);
            res.send(data).end();
        }
    });
});


router.post('/regist',function(req,res,next){
    var data = req.body;
    data = typeof data == 'string' ? JSON.parse(data) : data;
    console.log(data);
    var uname=data.uname,
        upwd=data.upwd,
        uphone=data.uphone,
        uemail=data.uemail;
    console.log(uname,upwd,uphone,uemail);
    let sql=' INSERT INTO `user`(`uid`, `uname`, `upwd`, `uphone`, `uemail`, `uavatar`) VALUES (null,"'+uname+'","'+upwd+'","'+uphone+'","'+uemail+'",null)';
    db.query(sql,(err,data)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.json({
                status:1,
                msg:'注册成功'
            });
            res.send().end();
        }
    })
})

module.exports = router;
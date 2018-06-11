var express =require('express');
var router =express.Router();
var fs=require('fs');
const PATH='./public/data/';
var db=require('../db.js');
var session=require('express-session');

//读取数据库将数据写入info.json

//读取展示接口
router.get('/read',function(req,res,next){ 
    // var type=req.param('type');
    // fs.readFile(PATH + type + '.json',(err,data)=>{
    //     if(err){
    //         return res.send({
    //             status:0,
    //             msg:'读取失败'
    //         });
    //     }
    //     const COUNT=10;
    //     var obj=JSON.parse(data.toString());
    //     if(obj.length>COUNT){
    //        obj=obj.slice(0,COUNT);
    //     }
    //     return res.send({
    //         status:1,
    //         data:obj
    //     });
    // });
    let sql='SELECT hid,address,houseType,city,district,(SELECT uname From user WHERE uid=uid)as owner,(SELECT uphone FROM user WHERE uid=uid)as uphone FROM houseinfo';
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

//管理员登录接口
router.post('/login',function(req,res,next){
    var from = req.session;
    var admin = req.body.admin;
    var apwd = req.body.apwd;
    let sql="SELECT aname,apwd FROM houseadmin WHERE aname='"+admin+"'";
    db.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            res.json({
                status:0,
                msg:'登录失败'
            })
            return;
        }
        // console.log(rows.length);
        // console.log(rows);
        if(rows.length>0){
            if(rows[0]['apwd']===apwd){
                var user={'username':rows[0]['aname']};
                req.session.user=user;
                res.json({
                    status:1,
                    msg:'登录成功'
                })
            }else{
                res.json({
                    status:3,
                    msg:'密码错误'
                })
            }
        }else{
            res.json({
                status:2,
                msg:'账号错误'
            })
        }
    });
});


module.exports=router;
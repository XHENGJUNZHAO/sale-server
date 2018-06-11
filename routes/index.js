var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user){
    return res.render('login',{});
  }
  res.render('index',{});
});

router.get('/house',function(req,res,next){
  res.render('house',{});
});

router.get('/nosure',function(req,res,next){
  res.render('nosure',{});
});

// 登录页面
router.get('/login',function(req,res,next){
  res.render('login',{});
});

module.exports = router;

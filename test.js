var db=require('./db.js');
var sql='SELECT * FROM user';
db.query(sql,function(err,rows,fields){
    if(err){
        console.log(err);
        return;
    }
    console.log(rows);
});
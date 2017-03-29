var csv = require('fast-csv')
var fs = require('fs')
var db;
var MongoClient = require('mongodb').MongoClient;

// connect to your db . here it is booksdb
var url = 'mongodb://127.0.0.1:27017/booksdb';
MongoClient.connect(url, function(err, database) {
   if(err){
     console.log("DataBase Error : " + err);
     res.send(err);
   }
   else{
     console.log("connected")
     db = database;
   }
});


var d = []; var obj = [];
// number of rows and cols in csv file.
var num_rows = 5; var num_cols = 6;
// enter name of csv file. here it is data.csv
fs.createReadStream("data.csv")
    .pipe(csv())
    .on("data", function(data){
        //console.log(data);
        d.push(data);
    })
    .on("end", function(){
        //console.log(d[0][0],d[1][1]);
        for(var i=1;i<num_rows;i++){
          var row = {};
          for(var j=0;j<num_cols;j++){
            row[d[0][j]] = d[i][j];
          }
          obj.push(row);
        }
        // enter collection you want to insert into. here it is books.
        db.collection('books').insertMany(obj),
        function(err){
          if(!err){
            console.log('Success')
          }
          else{
              console.log(err);
            }
        }
    });

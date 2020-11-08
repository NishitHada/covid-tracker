const db_config = require('./db_config');
const mongoose = require('mongoose');
const express = require("express");
const upload = require("express-fileupload");
const csvtojson = require("csvtojson");
const bodyParser = require('body-parser')
const port=5002;
const cors = require('cors');

app = express();
app.use(cors());
let csvData = "test";
app.use(upload());
app.use(bodyParser.urlencoded({ extended:true }));

async function connectDB(){
      try{
        await mongoose.connect(db_config.mongoConnectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      })
      }
      catch(error)
      {
        console.log('Error Connecting to DB-', error);
      }
      console.log('Connected');
    }

app.post("/upload-file", (req, res) => {
    csvData = req.files.file.data.toString('utf8');
    mongoose.connect(db_config.mongoConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected');
        
        let Emp = mongoose.model("Emp", db_config.EmpSchema);
        csvtojson().fromString(csvData).then((jsonObj)=>{
            console.log(jsonObj);
            Emp.insertMany(jsonObj, function(err, result) {
                if (err) {
                  res.send(err);
                } else {
                  res.send(result);
                }
            })
          })

        // return csvtojson().fromString(csvData).then(json => {
        // return res.status(201).json({csv:csvData, json:json})
    })
    // res.sendStatus(200);
});

app.post("/upload-form", (req, res) => {
  // console.log(req);
  mongoose.connect(db_config.mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected');
    let Emp = mongoose.model("Emp", db_config.EmpSchema);

    var tmp1 = JSON.stringify(req.body);
    var tmp = JSON.parse(tmp1);
    console.log(tmp);
    console.log(tmp.EmpName);
    console.log(tmp.EmpId);

    Emp.insertMany(tmp, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    })
  })
  // res.sendStatus(200);
})


app.get('/emp-count-by-location', async (req, res) => {
    mongoose.connect(db_config.mongoConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected');
        var Emp = mongoose.model("Emp", db_config.EmpSchema);
        var agg = Emp.aggregate([
          {$group:{ _id:"$Location", myCount: { $sum : 1}}}  
        ])
        .then( (data) => {
          console.log(data);
          res.status(200)
          .send(data);
        })

        // console.log(agg);
        // consolse.log(JSON.stringify(agg));
        // console.log(agg.pipeline[0])

        // res.sendStatus(200);
    })
})

app.get('/all-data', async (req, res) => {
    await connectDB();
    let Emp = mongoose.model("Emp", db_config.EmpSchema);
    try{
        Emp.find({}).then( (data) => {
      //   if(error){
      //       console.log("Error in executing query",error);
      //       res.send(error);
      //   }
      //   else{
          console.log(data);
          res.status(200).send(data);
      })
  }
  catch(error){
      console.log("Error in executing query",error);
       res.send(error)
  }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
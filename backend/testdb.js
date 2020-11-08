const db_config = require('./db_config');
const mongoose = require('mongoose');
const express = require("express");
const port=5002;
const cors = require('cors');

app = express();
app.use(cors());

// async function connectDB(){
//     try{
//       await mongoose.connect(db_config.mongoConnectionString, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     }
//     catch(error)
//     {
//       console.log('Error Connecting to DB-', error);
//     }
//     console.log('Connected');
//   }

db_config.connectDB();


  app.get('/all-data', async (req, res) => {
    //   await connectDB();
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


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
const mongoose = require('mongoose');

const username = 'user';
const password = 'pwd123';
const remoteURL = 'cluster0-shard-00-00.aq9un.mongodb.net:27017,cluster0-shard-00-01.aq9un.mongodb.net:27017,cluster0-shard-00-02.aq9un.mongodb.net:27017';
const dbName = 'csv_data';

const mongoConnectionString = `mongodb://${username}:${password}@${remoteURL}/${dbName}?ssl=true&replicaSet=atlas-9efm0j-shard-0&authSource=admin&retryWrites=true&w=majority`;
// export const mongoConnectionString = 'mongodb://user:pwd123@cluster0-shard-00-00.aq9un.mongodb.net:27017,cluster0-shard-00-01.aq9un.mongodb.net:27017,cluster0-shard-00-02.aq9un.mongodb.net:27017/user_data?ssl=true&replicaSet=atlas-9efm0j-shard-0&authSource=admin&retryWrites=true&w=majority';

const EmpSchema = new mongoose.Schema({
    EmpId: Number,
    EmpName: String,
    Location: String,
    StartDate: String,
    EndDate: String
},
{
    collection: 'map_dashboard'
});

// const connectDB = async () => {
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
// };

// export {mongoConnectionString, UserSchema};
exports.mongoConnectionString = mongoConnectionString;
exports.EmpSchema = EmpSchema;
// exports.connectDB = connectDB;
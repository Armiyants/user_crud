import mongoose from "mongoose";
import config from "../config/config.json" assert {type: "json"};


const connectionURI = `${config.mongoDB.host}:${config.mongoDB.port}/${config.mongoDB.database}`;

mongoose.connection.on('error', function(err) {
    console.error("Cannot connect to mongoDB");
});

mongoose.connection.once('open', function (callback) {
    console.log('Connection to database is established');
});

mongoose.set('debug', config.mongoDB.isDebug);

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

export default async () => {mongoose.connect(connectionURI, connectOptions).then(
    () => {
        console.log('Mongoose connection open to: ' + connectionURI);
    }
).catch(err => {
    console.error("MongoDB connection error: " + err);
})
};



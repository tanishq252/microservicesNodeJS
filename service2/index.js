import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongosse from 'mongoose';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// initializing the app
const app  = express();
dotenv.config();

// cross origin resource sharing
app.use(cors());

// for images and posting data
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

// simple get request
app.get('/', (req, res)=>{
    res.send("Service 2");
})

const client = new MongoClient(process.env.CONNECTION_URL);

app.get('/operation', async (req, res) => {
    const database = client.db("microservices");
    const collection1 = database.collection("service1");
    const collection2 = database.collection("service2");
    const estimate = await collection2.estimatedDocumentCount();
    console.log(`${estimate}`);
    var myobj = {requestTime: Date(), data: "this is the operation by service 2 made to collection service 1"}
    var myobj1 = {requestTime: Date(), data: "this is the operation by service 2 made to collection service 2"}
    await collection1.insertOne(myobj, function(err, res) {
        if (err) throw err;
        db.close();
    });
    await collection2.insertOne(myobj1, function(err, res) {
        if (err) throw err;
        db.close();
    });
    res.send("Operation for service 2");
  }
)

const PORT = process.env.PORT || 3000

mongosse.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, ()=>console.log(`service 2 running on PORT ${PORT}`)))
.catch((error)=>console.log(error));
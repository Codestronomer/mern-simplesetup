import express from 'express'
import devBundle from './devBundle'
import template from './../template'
import { MongoClient } from 'mongodb'
import path from 'path'
import { AppContainer } from 'react-hot-loader'

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-simplesetup'
MongoClient.connect(url, (err, db) => {
    console.log("Connected successfully  to server")
    db.close()
});

const app = express();
devBundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('/', (req, res) => {
    res.status(200).send(template())
});

let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
    if (err) {
        console.log(err)
    }
    console.info(`Server Started on port ${port}.`)
});
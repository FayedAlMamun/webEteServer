const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const uri = 'mongodb+srv://ETE:ETE1704048@cluster0.sbjn6.mongodb.net/WebETE?retryWrites=true&w=majority';

const app = express()
app.use(bodyParser.json());
app.use(cors());
const port = 5000

const client = new MongoClient(uri, {
  useNewUrlParser: true, useUnifiedTopology:
    true
});
client.connect(err => {
  const students = client.db("WebETE").collection("students");
  const teachers = client.db("WebETE").collection("teachers");
  const semresult= client.db("WebETE").collection("semresult");
  const ctmarks= client.db("WebETE").collection("ctmarks");
  app.post('/addStudents/', (req, res) => {
    const student = req.body
    console.log(student)
    students.insertOne(student)
      .then(result => {
        res.send(result.insertedCount > 0);
      }) 
  })
  app.get('/teachers', (req, res) => {
    teachers.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })
  app.get('/students',(req,res)=>{
    students.find({})
    .toArray((err,doc)=>{
      res.send(doc)
    })
  })

  app.post('/addSemres/', (req, res) => {
    const semResult = req.body
    semresult.insertOne(semResult)
      .then(result => {
        res.send(result.insertedCount > 0);
      }) 
  })
  app.post('/addCTM/', (req, res) => {
    const semResult = req.body
    ctmarks.insertOne(semResult)
      .then(result => {
        res.send(result.insertedCount > 0);
      }) 
  })
  app.get('/semRes', (req, res) => {
    semresult.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })
  app.get('/ctRes', (req, res) => {
    ctmarks.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })

});

app.listen(process.env.PORT || port)
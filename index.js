import express from 'express';
import crypto from 'crypto';
import { MongoClient } from 'mongodb';
// const express = require('express');
// const crypto = require("crypto");
// const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://abdulloev:0CSxryhOnWJEhipW@tojikonbookcl.jsrcsga.mongodb.net/';
const client = new MongoClient(url);
const dbName = 'TagGram';

const app = express();
app.use(express.json());


const jsonParser = express.json();
app.use(express.static(__dirname + "/static"));


app.post("/emailsignup", jsonParser, async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('USERS');



  if (!req.body) return res.sendStatus(400);
  const {userLogin,userPassword,userFirstName,userLastName,userEmail} = req.body;
  const hash = crypto.createHmac("sha256", userPassword).digest("hex");

  // const filteredDocs = await collection.find({ a: 3 }).toArray();
  // console.log('Found documents filtered by { a: 3 } =>', filteredDocs);

  let userProfil = {
          accauntlogin: userLogin,
          firstName: userFirstName,
          lastName: userLastName,
          telefon: null,
          email: userEmail,
          biography: "",
          password: hash
        }

  const insertResult = await collection.insertOne(userProfil);
  console.log('Inserted documents =>', insertResult);


  // await connection.query('SELECT accauntlogin FROM profil WHERE accauntlogin = ?', userLogin, function (error, results, fields) {
  //   if (error) throw error;
  //   if (results.length != 0) {
  //     res.send("имя пользователя занято");
  //   }
  //   else {
  //     let userProfil = {
  //       id: null,
  //       accauntlogin: userLogin,
  //       firstName: userFirstName,
  //       lastName: userLastName,
  //       telefon: null,
  //       email: userEmail,
  //       biography: "",
  //       password: hash
  //     }
  // //     connection.query('INSERT INTO profil SET ?', userProfil, function (error, results, fields) {
  // //       if (error) throw error;

  // //       const token = jwt.sign({ userLogin }, 'секретный_ключ');
  
  // // // Устанавливаем токен в куку
  // // res.cookie('token', token);

  // //       res.send(["result",userLogin]);

  // //     });
  //   }
  // });
});


// app.get('/', function (req, res) {
//     res.send('Hello World')
//   })




const port = process.env.PORT || 1313;

app.listen(port,() => console.log(`Listening to port ${port}`));

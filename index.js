import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
const url = 'mongodb+srv://abdulloev:0CSxryhOnWJEhipW@tojikonbookcl.jsrcsga.mongodb.net/';
const client = new MongoClient(url);
const dbName = 'TagGram';
app.use(express.json());
const jsonParser = express.json();
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use('/', express.static(path.join(__dirname)));

const port = process.env.PORT || 1313;

app.listen(port, () => console.log(`Listening to port ${port}`));

app.post("/emailsignup", jsonParser, async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('USERS');



  if (!req.body) return res.sendStatus(400);
  const { userLogin, userPassword, userFirstName, userLastName, userEmail } = req.body;
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
})

const express = require('express');

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello Friend')
  })

// MONGO DB START
const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://abdulloev:0CSxryhOnWJEhipW@tojikonbookcl.jsrcsga.mongodb.net/';
const client = new MongoClient(url);
const dbName = 'Friend';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
// MONGO DB END


const port = process.env.PORT || 9001;

app.listen(port,() => console.log(`Listening to port ${port}`));

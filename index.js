const express = require('express');

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World')
  })

const port = process.env.PORT || 9001;

app.listen(port,() => console.log(`Listening to port ${port}`));

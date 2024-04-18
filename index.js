
const express = require('express')


const { getConnection } = require('./db/db-connect-mongo');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


const port = 3000;

getConnection();


app.use('/genero', require('./router/genero'));
app.use('/director', require('./router/director'));
app.use('/productora', require('./router/productora'));
app.use('/tipo', require('./router/tipo'));
app.use('/media', require('./router/media'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
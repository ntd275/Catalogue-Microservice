const express = require('express')
// const cookieParser = require('cookie-parser');
const cors = require('cors')

const routes = require('./routes/routes')
const port = 80

const app = express();

app.use(cors());

// app.use(cookieParser());
app.use(express.json());
app.use('/public', express.static('./public'));

routes(app)

app.listen(port, () => console.log('RESTFul API running on :', port));
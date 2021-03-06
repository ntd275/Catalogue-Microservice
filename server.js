const express = require('express')
// const cookieParser = require('cookie-parser');
const cors = require('cors')

const routes = require('./routes/routes')
const port = 80

const app = express();

app.use(cors());

// app.use(cookieParser());
app.use(express.json({limit: "50mb"}));
app.use('/catalogue/images/', express.static('./public'));

routes(app)

app.listen(port, () => console.log('RESTFul API running on :', port));
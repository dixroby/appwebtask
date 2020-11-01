var express = require('express'),
  app = express(),
  port = process.env.PORT || 9000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');

mongoose.Promise = global.Promise;

const connection_url ="mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@cluster0.urc6a.mongodb.net/"+process.env.MONGO_DATABASE+"?retryWrites=true&w=majority";

mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});

app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes');
routes(app);

app.get('/',(req,res) => res.status(200).send("hola"));

app.listen(port);

console.log('todo list RESTful API server started on localhost:' + port);

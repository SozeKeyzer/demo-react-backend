const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize=require('./database/connect');
const cors=require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const allowedOrigins = ['http://localhost:3000'];
// app.use(cors({
//   origin: function(origin, callback){
//     if (!origin) {
//       return callback(null, true);
//     }

//     if (allowedOrigins.includes(origin)) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }

// }));
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  origin: 'http://localhost:3000',
}));
const userRoutes=require('./routes/userRoutes');
app.use(userRoutes);

app.get('/', function (req, res) {
  res.send('Hello World')
});

sequelize.sync().then(result => {
  app.listen(4000,()=>{
    console.log('server started on port 4000')
  });
}).catch(err => {
  console.log(err);
});
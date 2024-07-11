const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {logErrors,errorHandler,boomErrorHandler} = require('./middlewares/error.handler');
const { options } = require('joi');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080','http://myapp.com','http://localhost:3000'];
const optionswhitelist = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
        }
  }
}

app.use(cors(optionswhitelist));


app.get('/', (req,res) => {
  res.send('Hola mi server en express');
})



app.listen(port, () => {
  console.log('Mi port ' + port);
});


routerApi(app);


/* app.use(logErrors); */
app.use(boomErrorHandler);
/* app.use(errorHandler); */



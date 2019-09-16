const Koa = require('koa');
const koaBody = require('koa-body');
const parameter = require('koa-parameter');
const routing = require('./routes');
const mongoose = require("mongoose");
const { DBconnectedUrl } = require("./config");
const path = require("path")
const cors = require('koa2-cors');



const app = new Koa();
mongoose.connect(DBconnectedUrl, {useNewUrlParser: true})

app.use(cors({
    origin: function(ctx) {
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '/public/uploads'),
        keepExtensions: true,
    },
}));


app.use(parameter(app));

routing(app);

app.listen(3010, () => {
    console.log("start.....")
});
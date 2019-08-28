const Koa = require('koa');
const koaBody = require('koa-body');
const parameter = require('koa-parameter');
const routing = require('./routes');
const mongoose = require("mongoose");
const { DBconnectedUrl } = require("./config");
const path = require("path")



const app = new Koa();
mongoose.connect(DBconnectedUrl, {useNewUrlParser: true})

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
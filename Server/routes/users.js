const Router = require('koa-router');
const router = new Router({ prefix: '/api/users' });
const { regist,avatar,md5password } = require("../controller/users");


router.post('/register',avatar,md5password,regist);

module.exports = router; 
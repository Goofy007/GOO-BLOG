const Router = require('koa-router');
const router = new Router({ prefix: '/api/users' });
const auth = require("../middleware/auth")
const { regist,avatar,md5password,login } = require("../controller/users");


// 注册用户
router.post('/register',avatar,md5password,regist);

// 登录
router.post('/login',login);

// test auth
router.post('/current',auth,(ctx) => {
    console.log("OKKK")
    ctx.body = {
        msg: "CURRENT SUCCESS"
    }
})

module.exports = router; 
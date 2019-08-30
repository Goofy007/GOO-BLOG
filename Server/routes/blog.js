const Router = require('koa-router');
const router = new Router({ prefix: '/api/blogs' });
const auth = require("../middleware/auth")
const { add,update,del,getone,getall } = require("../controller/blog");


// add 新文章

router.post("/add", auth, add)

// update 文章

router.post("/update/:id", auth, update)

// del 文章

router.post("/delete/:id", auth, del)

// 获取文章列表

router.get("/", getall)

// 获取单篇文章
router.get("/:id", getone)



module.exports = router; 
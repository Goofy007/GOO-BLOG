const User = require("../models/users");
const auth = require("../middleware/auth");
const graqvatar = require('gravatar');
const { SuccessModel, ErrorModel } = require('../models/resModel')
const {genPassword} = require("../utils/cryp")


class UserCtrl {
    async avatar(ctx, next) {
        ctx.request.body.avatar = graqvatar.url(ctx.request.body.email, { s: '200', r: 'pg', d: 'mm' })
        await next()
    }

    async md5password(ctx,next) {
        ctx.request.body.password = genPassword(ctx.request.body.password)
        await next()
    }
    async regist(ctx) {
        const {username} = ctx.request.body;
        const repeatedUser = await User.findOne({username});
        if (repeatedUser) { ctx.body = new ErrorModel('已有用户')}
        const newUser = new User(ctx.request.body)
        const user = await newUser.save();
        console.log(user)
        ctx.body = new SuccessModel(user);
    }
}

module.exports = new UserCtrl();
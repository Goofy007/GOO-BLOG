const User = require("../models/users");
const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../config');
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

    async login(ctx) {
        const { username,password } = ctx.request.body;
        // 查看用户是否存在
        let result = await User.findOne({username})
        if (!result) {return ctx.body = new ErrorModel('用户不存在')}
        const {_id,name} = result;
        // 密码匹配
        if (genPassword(password) === result.password) {
            const token = jsonwebtoken.sign({_id, name},secret,{ expiresIn: '1d' })
            ctx.body = {token}
        }else {return ctx.body = new ErrorModel('密码不正确')}
    }
}

module.exports = new UserCtrl();
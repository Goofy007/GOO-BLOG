const Blog = require("../models/blog");
const jsonwebtoken = require('jsonwebtoken');
const { SuccessModel, ErrorModel } = require('../models/resModel')



class BlogCtrl {
    async add(ctx) {
        const request = ctx.request.body;
        ctx.verifyParams({
            title: { type: 'string', required: true },
            content: { type: 'string', required: true },
            author: { type: 'string', required: true }
        })
        const blog = await new Blog(ctx.request.body).save();
        ctx.body = new SuccessModel(blog);
    }

    async update(ctx) {
        ctx.verifyParams({
            title: { type: 'string', required: true },
            content: { type: 'string', required: true },
            author: { type: 'string', required: true }
        })
        const blog = await Blog.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!blog) {
            ctx.body = new ErrorModel("文章不存在")
            ctx.status = 404
        }
        ctx.body = new SuccessModel(blog);
    }

    async del(ctx) {
        const blog = await Blog.findByIdAndRemove(ctx.params.id);
        if (!blog) { ctx.throw(404, '文章不存在'); }
        ctx.status = 204;
    }

    async getall(ctx) {
        const result = await Blog.find()
        if (result) {ctx.body = new SuccessModel(result)}
    }

    async getone(ctx) {
        const result = await Blog.findById(ctx.params.id)
        if (result) { ctx.body = new SuccessModel(result) }
        else { ctx.body = new ErrorModel("文章不存在") }
    }
}

module.exports = new BlogCtrl();
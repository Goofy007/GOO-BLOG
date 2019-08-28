const crtpto = require("crypto")

// 密钥
const SECRET_KEY = 'Goofy_717#'

// md5加密
function md5(content) {
    let md5 = crtpto.createHash('md5')
    return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports = {
    genPassword
}
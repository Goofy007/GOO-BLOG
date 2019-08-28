class BaseModel {
    constructor(data,messgae) {
        if (typeof data === 'string') {
            this.messgae = data;
            data = null;
            message = null;
        }
        if (data) {this.data = data}
        if (messgae) {this.messgae = messgae}
    }
}

class SuccessModel extends BaseModel {
    constructor(data,message) {
        super(data,message);
        this.errno = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data,message) {
        super(data, message);
        this.errno = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
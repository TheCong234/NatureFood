module.exports = class BaseResponsive{
    constructor(success, message, data){
        this.success = success;
        this.message = message;
        this.data = data
    }

    static success(message, data){
        return new BaseResponsive(true, message, data);
    }

    static error(message, data){
        return new BaseResponsive(false, message, data);
    }
}
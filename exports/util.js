const mongoose = require("mongoose")

//不为空?
function notEmpty(data) {
    return !isEmpty(data)
}

/**
 * 判断一个变是否为空(默认值也算为空)
 * @param {*} data  string,object,array
 * @returns
 */
//
function isEmpty(data) {
    if (data === null || data === undefined || data === "") {
        return true
    }
    if (typeof data == "boolean") {
        return false
    }

    if (typeof data == "string" || typeof data === undefined || typeof data === "undefined") {
        return data === null || data === undefined || data === "" || data === "undefined"
    }

    if (typeof data == "number" && parseFloat(data) === 0) {
        return true
    }

    if (typeof data == "number" && isNaN(data)) {
        return true
    }

    if (data instanceof mongoose.Types.ObjectId) {
        return false
    }

    if (data instanceof Array) {
        return data.length === 0
    }
    if (data instanceof Date) {
        return false
    }

    if (typeof data == "object") {
        return Object.keys(data).length === 0
    }

    return false
}


module.exports = {
    notEmpty,
    isEmpty
}

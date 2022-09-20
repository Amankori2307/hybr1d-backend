function genResponse(success, error, message = "", body = {}) {
    return {
        success: success,
        error: error,
        body: body,
        message: message
    }
}

module.exports = {
    genErrorResponse: function (message = "", body = {}) {
        return genResponse(false, true, message, body)
    },


    genSuccessResponse: function (message = "", body = {}) {
        return genResponse(true, false, message, body)
    },
}
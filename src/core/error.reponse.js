const StatusCode = {
    FORBIDEN: 403,
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDEN: "Bad request error",
    CONFLICT: "Conflict error"
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDEN, statusCode = StatusCode.FORBIDEN) {
        super(message, statusCode)
    }
}

class ConflictError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}

module.exports = {
    ForbiddenError,
    ConflictError
}
const StatusCode = {
    SUCCESS: 200,
    CREATED: 201,
}

const ReasonStatusCode = {
    SUCCESS: "Success",
    CREATED: "Created success",
}

class SuccessResponse {
    constructor({ message, statusCode = StatusCode.SUCCESS, reasonStatusCode = ReasonStatusCode.SUCCESS, metadata = {} }) {
        this.message = message ? message : reasonStatusCode
        this.status = statusCode
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.status).json(
            this
        )
    }
}

class CREATED extends SuccessResponse {
    constructor({ message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata }) {
        super({ message, statusCode, reasonStatusCode, metadata });
    }
    send(res, headers = {}) {
        return res
            .status(this.status)
            .cookie("acccess_token", this.metadata.tokens.accessToken, {
                httpOnly: true,
                secure: false
            })
            .cookie("refesh_token", this.metadata.tokens.refreshToken, {
                httpOnly: true,
                secure: false
            })
            .json(
                this
            )
    }
}

module.exports = {
    SuccessResponse, CREATED
}

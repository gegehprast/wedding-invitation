class HttpException extends Error {
    public message = 'Internal server error.'

    public code = 500

    public stack = ''

    constructor(code?: number, message?: string, stack?: string) {
        super()

        if (code) {
            this.code = code
        }

        if (message) {
            this.message = message
        }

        if (stack) {
            this.stack = stack
        }
    }
}

export default HttpException

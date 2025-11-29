class ApiError extends Error{
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null,
        this.message = message,
        this.success = false;
        this.errors = errors;
        
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

console.log(new ApiError(200, 'dododo'))

export default ApiError;
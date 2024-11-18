class ResponseFormatter {
    static success(data = {}) {
        return {
          success: true,
          data: data.items || data,  
          ...(data.pagination && { pagination: data.pagination }) 
        };
    }

    static error(message = 'An error occurred', code = 500, errors = []) {
        return {
            success: false,
            error: {
                message,
                code,
                ...(errors.length > 0 && { details: errors })
            }
        };
    }
    
    static sendSuccess(res, data = {}, statusCode = 200) {
        const responseData = this.success(data);
        return res.status(statusCode).json(responseData);
    }

    static sendError(res, message = 'An error occurred', code = 500, errors = []) {
        const errorData = this.error(message, code, errors);
        return res.status(code).json(errorData);
    }
}

module.exports = ResponseFormatter;

import { ApiResponse } from "../types/http-response-type";

export const HttpResponse = {
    success<T>(data: T, message = 'success'): ApiResponse<T> {
        return{
            success:true,
            statusCode: 200,
            message,
            data,
            error:null
        }
    },

    create<T>(data: T, message = "The data has been created successfully"):ApiResponse<T>{
         return {
            success: true,
            statusCode: 201,
            message,
            data,
        };
    },

    badRequest(message='Invalid request', error?: any):ApiResponse {
        return{
            success:false,
            statusCode:400,
            message,
            error
        }
    },

    serverError(message = 'Login error', error?:any):ApiResponse {
        return{
            success:false,
            statusCode:500,
            message,
            error
        }
    },

    notFound(message = "Not Found", error?:any):ApiResponse {
         return{
            success:false,
            statusCode:404,
            message,
            error
        }
    },
    unauthorized(message = "Unauthorized Access"): ApiResponse {
    return {
      success: false,
      statusCode: 401,
      message,
    };
  },

  forbidden(message = "Request Forbidden"): ApiResponse {
    return {
      success: false,
      statusCode: 403,
      message,
    };
  },
}
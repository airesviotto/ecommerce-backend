export type ApiResponse<T = any> = {
    success: boolean;
    statusCode: number;
    data?: T;
    message: string;
    error?: any
}
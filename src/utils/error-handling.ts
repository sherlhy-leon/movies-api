import { HttpStatusCode } from "axios";

export interface CustomResponse<T> {
    statusCode: HttpStatusCode,
    body: T,
    headers: Record<string, any>
}

/**
 * Get an object to return from the API call that indicates failure based on an Error exception.
 * @param error
 * @param event
 * @returns
 */
export function apiFailure<T extends Error>(error: T): CustomResponse<any> {
    let msg: string;
    let statusCode: number;
    if (error instanceof ValidationError) {
        msg = error.message;
        statusCode = 400;
    } else if (error instanceof UnauthorizedError) {
        msg = error.reason;
        statusCode = 401;
    } else if (error instanceof ForbiddenError) {
        msg = error.reason + (error.additionalInfo ? `: ${error.additionalInfo}` : '');
        statusCode = 403;
    } else if (error instanceof NotFoundError) {
        msg = error.reason;
        statusCode = 404;
    } else {
        msg = 'Unexpected Error';
        statusCode = 500;
    }
    return apiFailureWithMsg(msg, statusCode);
}

/**
 * Get an object to return from the API call that indicates success with a string message body.
 * @param msg
 * @param event
 * @param statusCode
 */
export function apiFailureWithMsg(
    msg: string,
    statusCode?: number
): CustomResponse<any> {
    const statusCodeNew = statusCode === undefined ? 500 : statusCode;
    return apiResponse(statusCodeNew, 'text', msg);
}

/**
 * Get an object to return from the API call that indicates success.
 * @param statusCode
 * @param event
 * @param body
 * @returns
 */
export function apiSuccess<T>(
    statusCode: number = 200,
    body?: T
): CustomResponse<any> {
    return apiResponse(statusCode, 'json', body);
}

/**
 * Use this one if you want to have full control yourself.
 *
 * @param statusCode
 * @param _event the request event sent into the lambda
 * @param type Whether the response is json or plain text.
 * @param body The body of the response
 * @returns
 */
export function apiResponse(
    statusCode: number,
    type: 'text' | 'json',
    body?: any
): CustomResponse<any> {
    return {
        statusCode,
        body: body === undefined ? '' : body,
        headers: {
            'Content-Type': type === 'json' ? 'application/json' : 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        }
    };
}


export abstract class DsError {
    public readonly success = false;
    public abstract readonly reason: string;
}

export abstract class ValidationError {
    public readonly reason = 'Validation Error';
}

export class UnauthorizedError extends DsError {
    public readonly reason = 'Unauthorized';
}

export class ForbiddenError extends DsError {
    public readonly reason = 'Forbidden Access';
    constructor(public additionalInfo?: string) {
        super();
    }
}

export class NotFoundError extends DsError {
    public reason = 'Resource Not Found';
    constructor(public message?: string) {
        super();
        this.reason = message ?? this.reason;
    }
}

export class InvalidJsonBodyError extends DsError {
    public reason = 'Invalid Json Body';

    constructor() {
        super();
    }
}
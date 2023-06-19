import { Request, Response, NextFunction } from 'express';

export type OriginalRequest = Request;
export type OriginalResponse = Response;
export type OriginalNextFunction = NextFunction;

export interface RequestWithUserId extends Request {
    userId: string;
}

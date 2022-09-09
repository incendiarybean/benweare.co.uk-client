import * as express from "express";

/* TYPES FOR EXPRESS REQUEST */
declare global {
    namespace Express {
        interface Request {
            message: string;
        }
    }
}

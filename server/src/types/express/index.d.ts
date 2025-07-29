import express from 'express';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
      };
    }
  }
}

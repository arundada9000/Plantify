import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      decodedAccessToken: {
        email: string;
        name: string;
        iat: number;
        exp: number;
      };
    }
  }
}
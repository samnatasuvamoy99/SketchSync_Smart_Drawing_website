declare global {
  namespace Express {
   export interface Request {
      user_Id: string;
    }
  }
}

export {};

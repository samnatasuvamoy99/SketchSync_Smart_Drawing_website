declare global {
  namespace Express {
    interface Request {
      user_Id?: number;
    }
  }
}

export {};

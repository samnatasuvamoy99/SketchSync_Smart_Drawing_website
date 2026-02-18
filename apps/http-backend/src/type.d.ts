declare global {
  namespace Express {
    interface Request {
      user_Id?: string;
    }
  }
}

export {};

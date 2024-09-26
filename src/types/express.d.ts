import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadCustom;
    }
  }
}

export interface JwtPayloadCustom extends JwtPayload {
  id: string;
  role: string;
}

import { JwtPayload } from "jsonwebtoken";
import { WebSocket } from "ws";

export interface AuthPayload extends JwtPayload {
  userId: string;
}

export interface ConnectedUser {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}
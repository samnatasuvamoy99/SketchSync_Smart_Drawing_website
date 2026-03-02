import { WebSocket } from "ws";
import { ConnectedUser } from "../../types";

export class UserManager {
  private users: ConnectedUser[] = [];

  addUser(user: ConnectedUser) {
    this.users.push(user);
  }

  removeUser(ws: WebSocket) {
    this.users = this.users.filter(user => user.ws !== ws);
  }

  getUser(ws: WebSocket) {
    return this.users.find(user => user.ws === ws);
  }

  getUsers() {
    return this.users;
  }
}

export const userManager = new UserManager();
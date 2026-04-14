import { Message } from './ChatType';
export interface CreateRoomResponse {
  id: string;         // e.g. "ROOM-X4K2-9PQR"
  roomName: string;       // e.g. "design-sprint"
  link: string;       // e.g. "sketching.link/room/room-x4k2-9pqr"
  createdAt: string;  // ISO timestamp
  membersOnline:number
}

export interface JoinRoomResponse {
  success: boolean;
  roomId: string;
  roomName: string;
  membersOnline: number;
  joinedAt: string;
}

export interface RoomCardProps {

  onRoomCreated?: (room: CreateRoomResponse) => void;
  /** user successfully joins a room */
  onRoomJoined?: (data: JoinRoomResponse) => void;
  apiBase?: string;
  isOpen: boolean;
  onClose?: () => void;
}


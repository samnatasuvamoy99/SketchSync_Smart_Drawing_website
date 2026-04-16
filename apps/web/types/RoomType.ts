import { Message } from './ChatType';
export interface CreateRoomResponse {
  id: string;         
  roomName: string;      
  link: string;      
  createdAt: string; 
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


 export interface Message {
  messages: any;
  id:number;
  sender: string;
  text: string;
  isSelf: boolean;
  createdAt?: string
}

export interface ChatCardProps {
  roomName: string;
  roomId?: string;
  isOpen: boolean;
  onClose?: () => void;
}
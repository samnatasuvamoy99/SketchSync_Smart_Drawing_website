 export interface Message {
  id: string;
  sender: string;
  text: string;
  isSelf: boolean;
  isAI: boolean;
}

export interface ChatCardProps {
  roomName: string;
  roomId?: string;
  isOpen: boolean;
  onClose?: () => void;
}
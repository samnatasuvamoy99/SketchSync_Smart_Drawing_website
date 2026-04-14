"use client"
import { SentBubble } from "./SentBubble";
import { ReceivedBubble } from "./ReceivedBubble";
import { Message } from "@/types/ChatType";



// check it's  sent or receive msg 
export function MsgBubble({ msg }: { msg: Message }) {
  if (msg.isSelf) return <SentBubble text={msg.text} />;
  return <ReceivedBubble sender={msg.sender} text={msg.text} />;
}

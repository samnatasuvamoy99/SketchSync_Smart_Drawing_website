
import { BACKEND_URL } from "@/config";
import { Shape } from '../types/DrawingShapesTypes';


// why need Promise ,,, after hit the backend what res they can return in my fronted , so we are use promise which types of request they can return define it...
export async function getExistingShapes(
  roomId: string
): Promise<Shape[]> {

  const res = await fetch(`${BACKEND_URL}/message/v2/admin/chat/chats/:${roomId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  // if (!res.ok) {
  //   throw new Error("Failed to fetch messages");
  // }

  // const data : ShapeResponse  = await res.json();

  const shapes =  res.formData.messages;


  //convert string → object
  const Allshapes = shapes.map((mes:string) => {
        const messageData  = JSON.parse(mes.message)
  });

  return Allshapes;
}
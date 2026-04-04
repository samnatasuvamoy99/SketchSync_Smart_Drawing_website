
import { BACKEND_URL } from "@/config";
import {ShapeResponse,Shape} from '../types/ShapesType';


// why need Promise ,,, after hit the backend what res they can return in my fronted , so we are use promise which types of request they can return define it...
export async function getExistingShapes(
  roomId: string
): Promise<Shape[]> {

  const res = await fetch(
    `${BACKEND_URL}/shapes/v3/room/chats/shapes/${roomId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }

  const data : ShapeResponse  = await res.json();

  //convert string → object
  const shapes = data.shapes.map((x) => {
    return JSON.parse(x.Shapes);
  });

  return shapes;
}
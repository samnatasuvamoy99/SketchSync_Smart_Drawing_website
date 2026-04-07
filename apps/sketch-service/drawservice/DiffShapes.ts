import { getExistingShapes } from "@/service/ShapeService";
import { Shape } from "@/types/DrawingShapesTypes";
import { clearCanvas } from "./ClearCanvas";



export async function initSketch(canvas: HTMLCanvasElement, roomId?: string, Socket?: WebSocket) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;


  // this is the endpoints for check only 
  let existingShapes: Shape[] = [];  // store multiple shapes;

  if (roomId) {
    existingShapes = await getExistingShapes(roomId);
  }


  //Check the type then store it...
  if (Socket) {
    Socket.onmessage = (event) => {
      const AllShapes = JSON.parse(event.data);

      if (AllShapes.type == "chat") {
        const parsedShape = JSON.parse(AllShapes.shape)
        existingShapes.push(parsedShape)

        clearCanvas(existingShapes, canvas, ctx);
      }
    }
  }




  //canvas background color.........
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let clicked = false;
  let startX = 0;  // x coordinate 
  let startY = 0;  // y coordinate 

  // proper mouse position
  const getMousePos = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();  // catchup  which position user mouse clicked...


    return {
      x: (e.clientX - rect.left),
      y: (e.clientY - rect.top),
    };
  };

  const handleMouseDown = (e: MouseEvent) => {
    clicked = true;

    const pos = getMousePos(e);  // Catch canvas mouse position....

    startX = pos.x;
    startY = pos.y;
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!clicked) return;

    clicked = false;

    const pos = getMousePos(e);

    const width = pos.x - startX;  //  for  calculate  width and height 
    const height = pos.y - startY;
      
     const shape :Shape ={
      type: "rectangle",
      x: startX,
      y: startY,
      width,
      height,
     }
    existingShapes.push(shape);
     
    //broadcast the shapes 
    Socket?.send(JSON.stringify({
          type:"chat",
          message:JSON.stringify({
              shape
          }),
          roomId:roomId
    }))
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!clicked) return;

    const pos = getMousePos(e);

    const width = pos.x - startX;
    const height = pos.y - startY;


    requestAnimationFrame(() => {
      clearCanvas(existingShapes, canvas, ctx);

      ctx.strokeStyle = "white"; // stroke color.......
      ctx.lineWidth = 2;

      ctx.strokeRect(startX, startY, width, height);
    });
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);


  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousemove", handleMouseMove);
  };
}



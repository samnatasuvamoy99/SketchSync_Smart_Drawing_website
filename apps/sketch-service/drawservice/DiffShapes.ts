import { getExistingShapes } from "@/service/ShapeService";
import { Shape } from "@/types/DrawingShapesTypes";
import { clearCanvas } from "./ClearCanvas";

export async function initSketch(
  canvas: HTMLCanvasElement,
  roomId?: string,
  Socket?: WebSocket
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // DPR setup (ONLY for sharpness)
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);

  let existingShapes: Shape[] = [];

  // Load previous shapes
  if (roomId) {
    existingShapes = await getExistingShapes(roomId);
    clearCanvas(existingShapes, canvas, ctx);
  }

  // WebSocket
  if (Socket) {
    Socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "realtime_drawing") {
        try {
          const parsed = JSON.parse(data.coordinate);
          const shape = parsed?.shape;

          if (shape) {
            existingShapes.push(shape);
            clearCanvas(existingShapes, canvas, ctx);
          }
        } catch (err) {
          console.error("WS error:", err);
        }
      }
    };
  }

  let clicked = false;
  let startX = 0;
  let startY = 0;

  // PURE CSS coordinates (NO scaling here)
  const getMousePos = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: MouseEvent) => {
    clicked = true;
    const pos = getMousePos(e);
    startX = pos.x;
    startY = pos.y;
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!clicked) return;
    clicked = false;

    const pos = getMousePos(e);

    const width = pos.x - startX;
    const height = pos.y - startY;

    //  NORMALIZED using CSS size
    const shape: Shape = {
      type: "rectangle",
      x: startX / canvas.clientWidth,
      y: startY / canvas.clientHeight,
      width: width / canvas.clientWidth,
      height: height / canvas.clientHeight,
    };

    existingShapes.push(shape);
    clearCanvas(existingShapes, canvas, ctx);

    // Send to server
    Socket?.send(
      JSON.stringify({
        type: "realtime_drawing",
        coordinate: JSON.stringify({ shape }),
        roomId,
      })
    );
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!clicked) return;

    const pos = getMousePos(e);
    const width = pos.x - startX;
    const height = pos.y - startY;

    requestAnimationFrame(() => {
      clearCanvas(existingShapes, canvas, ctx);

      ctx.strokeStyle = "#f5f5f5";
      ctx.lineWidth = 1.5;

      
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
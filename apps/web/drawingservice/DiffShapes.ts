
import { getExistingShapes } from "@/service/ShapeService";
import { Shape, StrokeStyle } from "@/types/DrawingShapesTypes";
import { clearCanvas } from "./ClearCanvas";
import { drawDiamond } from "./util/Diamand";
import { drawArrow } from "./util/Drawarrow";
import { applyStrokeStyle } from "./util/StrokeStyle";

export async function initSketch(
  canvas: HTMLCanvasElement,
  roomId?: string,
  Socket?: WebSocket,
  tool?: React.MutableRefObject<string>,
  color?: React.MutableRefObject<string>,
  stroke?: React.MutableRefObject<number>,
  strokeStyle?: React.MutableRefObject<StrokeStyle>,
  textareaRef?: React.RefObject<HTMLTextAreaElement | null >
) {


  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // DPR setup
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  let existingShapes: Shape[] = [];
  let currentPencilPath: { x: number; y: number }[] = [];

  const textarea = textareaRef?.current;


if (textarea) {

  textarea.onkeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      textarea.blur(); // triggers onblur
    }
  };

  textarea.onblur = () => {

     if (!textarea.value.trim()) {
    textarea.style.display = "none";
    return;
  }

    const value = textarea.value.trim();

    console.log("TEXT SAVED:", value);
     
    if (!value) {
      textarea.style.display = "none";
      return;
    }

    const norm = (v: number, max: number) => v / max;

    const shape: Shape = {
      type: "text",
      x: norm(textarea.offsetLeft, canvas.clientWidth),
      y: norm(textarea.offsetTop, canvas.clientHeight),
      text: value,
      color: color?.current ?? "#fff",
      fontSize: 16,
    };
     

console.log("TEXT SAVED:", shape);


    existingShapes.push(shape);
    clearCanvas(existingShapes, canvas, ctx);

    Socket?.send(
      JSON.stringify({
        type: "realtime_drawing",
        coordinate: JSON.stringify({ shape }),
        roomId,
      })
    );

    textarea.style.display = "none";
  };
}


  if (roomId) {
    existingShapes = await getExistingShapes(roomId);
    clearCanvas(existingShapes, canvas, ctx);
  }

  if (Socket) {
    Socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "realtime_drawing") {
        const parsed = JSON.parse(data.coordinate);
        const shape = parsed?.shape;

        if (shape) {
          existingShapes.push(shape);
          clearCanvas(existingShapes, canvas, ctx);
        }
      }
    };
  }

  //when click mouse it's true
  let clicked = false;
  let startX = 0;
  let startY = 0;
  let animationFrameId: number | null = null;

  const getMousePos = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };


  // MOUSE DOWN
  const handleMouseDown = (e: MouseEvent) => {

     if (tool?.current === "text") return;
     
    const pos = getMousePos(e);

   
  if (tool?.current === "text") {

    console.log("TEXT CLICKED");
  const pos = getMousePos(e);
  const textarea = textareaRef?.current;
  if (!textarea) return;

    e.preventDefault();
  const rect = canvas.getBoundingClientRect();

  textarea.style.display = "block";
  textarea.style.left = `${pos.x}px`;
textarea.style.top = `${pos.y}px`;

  textarea.value = "";

   setTimeout(() => {
    textarea.focus(); // ensure focus AFTER event
  }, 0);

  return;
}
 if (tool?.current === "pencil") {
      clicked = true;
      currentPencilPath = [pos];
      return;
    }

    clicked = true;
    startX = pos.x;
    startY = pos.y;

  };



  // MOUSE UP
  const handleMouseUp = (e: MouseEvent) => {
    if (!clicked) return;
    clicked = false;

    const pos = getMousePos(e);
    const norm = (v: number, max: number) => v / max;

    let shape: Shape | null = null;
  
    //check current tool user click

    if (tool?.current === "pencil") {
      shape = {
        type: "pencil",
        points: currentPencilPath.map((p) => ({
          x: norm(p.x, canvas.clientWidth),
          y: norm(p.y, canvas.clientHeight),
        })),
        color: color?.current ?? "#fff",
        strokeWidth: stroke?.current ?? 1.5,
        strokeStyle: strokeStyle?.current,
      };
    }

    else if (tool?.current === "rectangle") {
      shape = {
        type: "rectangle",
        x: norm(startX, canvas.clientWidth),
        y: norm(startY, canvas.clientHeight),
        width: norm(pos.x - startX, canvas.clientWidth),
        height: norm(pos.y - startY, canvas.clientHeight),
        color: color?.current ?? "#fff",
        strokeWidth: stroke?.current ?? 1.5,
        strokeStyle: strokeStyle?.current,
      };
    }

    else if (tool?.current === "line") {
      shape = {
        type: "line",
        x1: norm(startX, canvas.clientWidth),
        y1: norm(startY, canvas.clientHeight),
        x2: norm(pos.x, canvas.clientWidth),
        y2: norm(pos.y, canvas.clientHeight),
        color: color?.current ?? "#fff",
        strokeWidth: stroke?.current ?? 1.5,
        strokeStyle: strokeStyle?.current,
      };
    }

    else if (tool?.current === "arrow") {
      shape = {
        type: "arrow",
        x1: norm(startX, canvas.clientWidth),
        y1: norm(startY, canvas.clientHeight),
        x2: norm(pos.x, canvas.clientWidth),
        y2: norm(pos.y, canvas.clientHeight),
        color: color?.current ?? "#fff",
        strokeWidth: stroke?.current ?? 1.5,
        strokeStyle: strokeStyle?.current,
      };
    }

    else if (tool?.current === "diamond") {
      shape = {
        type: "diamond",
        x: norm(startX, canvas.clientWidth),
        y: norm(startY, canvas.clientHeight),
        width: norm(pos.x - startX, canvas.clientWidth),
        height: norm(pos.y - startY, canvas.clientHeight),
        color: color?.current ?? "#fff",
        strokeWidth: stroke?.current ?? 1.5,
        strokeStyle: strokeStyle?.current,
      };
    }

    else if (tool?.current === "circle") {
      const dx = pos.x - startX;
      const dy = pos.y - startY;

      if (e.shiftKey) {
        const radius = Math.sqrt(dx * dx + dy * dy);

        shape = {
          type: "circle",
          centerX: norm(startX, canvas.clientWidth),
          centerY: norm(startY, canvas.clientHeight),
          radius: norm(radius, canvas.clientWidth),
          color: color?.current ?? "#fff",
          strokeWidth: stroke?.current ?? 1.5,
          strokeStyle: strokeStyle?.current,
        };
      } else {
        shape = {
          type: "ellipse",
          centerX: norm(startX, canvas.clientWidth),
          centerY: norm(startY, canvas.clientHeight),
          radiusX: norm(Math.abs(dx), canvas.clientWidth),
          radiusY: norm(Math.abs(dy), canvas.clientHeight),
          color: color?.current ?? "#fff",
          strokeWidth: stroke?.current ?? 1.5,
          strokeStyle: strokeStyle?.current,
        };
      }
    }

    if (!shape) return;

    // push current shapes in local store...
    existingShapes.push(shape);
    clearCanvas(existingShapes, canvas, ctx);

    Socket?.send(
      JSON.stringify({
        type: "realtime_drawing",
        coordinate: JSON.stringify({ shape }),
        roomId,
      })
    );
  };



  // MOUSE MOVE
  const handleMouseMove = (e: MouseEvent) => {
    if (!clicked) return;

    const pos = getMousePos(e);

    if (animationFrameId) return;

    animationFrameId = requestAnimationFrame(() => {
      clearCanvas(existingShapes, canvas, ctx);

      ctx.save();
      ctx.strokeStyle = color?.current ?? "#fff";
      ctx.lineWidth = stroke?.current ?? 1.5;
      applyStrokeStyle(ctx, strokeStyle?.current);

      if (tool?.current === "pencil") {
        currentPencilPath.push(pos);

        ctx.beginPath();
        for (let i = 0; i < currentPencilPath.length - 1; i++) {
          const p1 = currentPencilPath[i];
          const p2 = currentPencilPath[i + 1];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();
      } else {
        const w = pos.x - startX;
        const h = pos.y - startY;

        switch (tool?.current) {
          case "rectangle":
            ctx.strokeRect(startX, startY, w, h);
            break;

          case "line":
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            break;

          case "arrow":
            drawArrow(ctx, startX, startY, pos.x, pos.y);
            break;

          case "diamond":
            drawDiamond(ctx, startX, startY, w, h);
            break;

          case "circle":
            const dx = pos.x - startX;
            const dy = pos.y - startY;

            if (e.shiftKey) {
              const r = Math.sqrt(dx * dx + dy * dy);
              ctx.beginPath();
              ctx.arc(startX, startY, r, 0, Math.PI * 2);
            } else {
              ctx.beginPath();
              ctx.ellipse(startX, startY, Math.abs(dx), Math.abs(dy), 0, 0, Math.PI * 2);
            }
            ctx.stroke();
            break;
        }
      }

      ctx.restore();
      animationFrameId = null;
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
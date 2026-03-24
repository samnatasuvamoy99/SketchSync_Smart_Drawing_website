

type Shape =
  | {
      type: "rectangle";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "diamond";
      x: number;
      y: number;
      size: number;
    };

export function Sketch(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let existingShapes: Shape[] = [];

  // background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  // proper mouse position
  const getMousePos = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();

    return {
      x: (e.clientX - rect.left),
      y: (e.clientY - rect.top),
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

    existingShapes.push({
      type: "rectangle",
      x: startX,
      y: startY,
      width,
      height,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!clicked) return;

    const pos = getMousePos(e);

    const width = pos.x - startX;
    const height = pos.y - startY;


    requestAnimationFrame(() => {
      clearCanvas(existingShapes, canvas, ctx);

      ctx.strokeStyle = "white";
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

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.forEach((shape) => {
    if (shape.type === "rectangle") {
      ctx.strokeStyle = "white";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}
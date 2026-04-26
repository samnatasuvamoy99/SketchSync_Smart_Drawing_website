
import { Shape } from "@/types/DrawingShapesTypes";
import { drawDiamond } from "../util/Diamand";
import { drawArrow } from "../util/Drawarrow"
import { applyStrokeStyle } from "../util/StrokeStyle";


export function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  existingShapes.forEach((shape) => {
    ctx.save();
    ctx.strokeStyle = shape.color;
    ctx.lineWidth = shape.strokeWidth ?? 1.5;

    // optional: stroke style
    applyStrokeStyle(ctx, shape.strokeStyle);

    switch (shape.type) {
      case "rectangle":
        ctx.strokeRect(
          shape.x * width,
          shape.y * height,
          shape.width * width,
          shape.height * height
        );
        break;
      case "diamond":
        drawDiamond(
          ctx,
          shape.x * width,
          shape.y * height,
          shape.width * width,
          shape.height * height
        );
        break;

      case "circle":
        ctx.beginPath();
        ctx.arc(
          shape.centerX * width,
          shape.centerY * height,
          shape.radius * width,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        break;
      case "ellipse":
        ctx.beginPath();
        ctx.ellipse(
          shape.centerX * width,
          shape.centerY * height,
          shape.radiusX * width,
          shape.radiusY * height,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        break;

      case "text":
        ctx.fillStyle = shape.color || "#fff";
        ctx.font = `${shape.fontSize || 16}px sans-serif`;
        ctx.textBaseline = "top"; 

        ctx.fillText(
          shape.text,
          shape.x * width,
          shape.y * height
        );
        break;

      case "line":
        ctx.beginPath();
        ctx.moveTo(shape.x1 * width, shape.y1 * height);
        ctx.lineTo(shape.x2 * width, shape.y2 * height);
        ctx.stroke();
        break;

      case "arrow":
        drawArrow(
          ctx,
          shape.x1 * width,
          shape.y1 * height,
          shape.x2 * width,
          shape.y2 * height
        );
        break;

      case "pencil":
        if (shape.points.length < 2) return;

        ctx.beginPath();
        for (let i = 0; i < shape.points.length - 1; i++) {
          const p1 = shape.points[i];
          const p2 = shape.points[i + 1];

          ctx.moveTo(p1.x * width, p1.y * height);
          ctx.lineTo(p2.x * width, p2.y * height);
        }
        ctx.stroke();
        break;
    }

    ctx.restore();
  });
}
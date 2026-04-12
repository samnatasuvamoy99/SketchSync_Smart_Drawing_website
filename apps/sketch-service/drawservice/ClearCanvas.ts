import { Shape } from "@/types/DrawingShapesTypes";

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
    if (!shape) return;

    if (shape.type === "rectangle") {
      ctx.strokeStyle = "#f5f5f5";

      // convert normalized → CSS pixels
      ctx.strokeRect(
        shape.x * width,
        shape.y * height,
        shape.width * width,
        shape.height * height
      );
    }
  });
}
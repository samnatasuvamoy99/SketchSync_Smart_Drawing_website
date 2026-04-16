import { StrokeStyle } from '../../types/DrawingShapesTypes';

export function applyStrokeStyle(
  ctx: CanvasRenderingContext2D,
  style?: StrokeStyle
) {
  switch (style) {
    case "dashed":
      ctx.setLineDash([4, 4]);
      break;
    case "dotted":
      ctx.setLineDash([2, 4]);
      break;
    case "bold":
      ctx.lineWidth = 4;
      ctx.setLineDash([]);
      break;
    default:
      ctx.setLineDash([]);
  }
}
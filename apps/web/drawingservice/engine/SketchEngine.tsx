import { Shape, StrokeStyle } from "@/types/DrawingShapesTypes";
import { drawDiamond } from "@/drawingservice/util/Diamand";
import { drawArrow } from "@/drawingservice/util/Drawarrow";
import { applyStrokeStyle } from "@/drawingservice/util/StrokeStyle";
import { distance } from "../util/PixelHitPoint";




export class SketchEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private socket?: WebSocket;
  private roomId?: string;
  private textarea?: HTMLTextAreaElement | null;

  private shapes: Shape[] = [];
  private path: { x: number; y: number }[] = [];

  private tool = "pencil";
  private color = "#fff";
  private strokeWidth = 2;
  private strokeStyle?: StrokeStyle;
  private eraserSize = 10;


  private clicked = false;
  private startX = 0;
  private startY = 0;
  private isTyping = false;
  private textX = 0;
  private textY = 0;

  constructor(
    canvas: HTMLCanvasElement,
    options?: {
      socket?: WebSocket;
      roomId?: string;
      textarea?: HTMLTextAreaElement | null;
      initialShapes?: Shape[]; // loading prev shapes.....
    }
  ) {
    this.canvas = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    this.ctx = ctx;

    this.socket = options?.socket;
    this.roomId = options?.roomId;
    this.textarea = options?.textarea;

    //for loading prev shapes.....
    if (options?.initialShapes) {
      this.shapes = options.initialShapes;
    }


    this.setupCanvas();
    this.attachEvents();
    this.setupTextarea();
    this.setupSocket();

    this.redraw();
  }

  // ================= CANVAS =================
  private setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
  }

  // ================= SETTERS =================
  setTool(t: string) { this.tool = t; }
  setColor(c: string) { this.color = c; }
  setStroke(w: number) { this.strokeWidth = w; }
  setStrokeStyle(s: StrokeStyle) { this.strokeStyle = s; }

  // ================= SOCKET =================
  private setupSocket() {
    if (!this.socket) return;

    this.socket.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);

      if (data.type === "realtime_drawing") {
        const shape = JSON.parse(data.coordinate)?.shape;
        if (shape) {
          this.shapes.push(shape);
          this.redraw();
        }
      }
    });
  }

  private send(shape: Shape) {
    if (!this.socket) return;

    this.socket.send(JSON.stringify({
      type: "realtime_drawing",
      coordinate: JSON.stringify({ shape }),
      roomId: this.roomId,
    }));

    this.socket.send(JSON.stringify({
      type: "erase",
      roomId: this.roomId,
      shapeId: shape.id   //NOT x,y
    }));
  }

  // ================= TEXT =================
  private setupTextarea() {
    if (!this.textarea) return;

    this.textarea.onkeydown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.commitText();
      }
    };

    this.textarea.onblur = () => {
      this.commitText();
    };
  }

  private commitText() {
    if (!this.textarea) return;

    const value = this.textarea.value.trim();

    console.log("Committing text:", value);

    if (!value) {
      this.hideTextarea();
      return;
    }

    const shape: Shape = {
      id: crypto.randomUUID(),
      type: "text",
      x: this.textX,
      y: this.textY,
      text: value,
      color: this.color,
      fontSize: 16,
    };

    this.shapes.push(shape);

    this.redraw();
    this.send(shape);

    this.hideTextarea();
  }

  private hideTextarea() {
    if (!this.textarea) return;
    this.textarea.style.display = "none";
    this.textarea.value = "";
    this.isTyping = false;
  }

  // ================= DRAW =================
  private redraw() {
    // Get actual display size
    const displayWidth = this.canvas.clientWidth;
    const displayHeight = this.canvas.clientHeight;

    // Clear entire canvas (using internal dimensions)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw black background (using display dimensions since we have DPR scaling)
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, displayWidth, displayHeight);

    for (const s of this.shapes) {
      this.ctx.save();

      this.ctx.strokeStyle = s.color || "#fff";
      this.ctx.lineWidth = s.strokeWidth || 2;
      applyStrokeStyle(this.ctx, s.strokeStyle);

      switch (s.type) {
        case "rectangle":
          this.ctx.strokeRect(s.x, s.y, s.width, s.height);
          break;

        case "line":
          this.ctx.beginPath();
          this.ctx.moveTo(s.x1, s.y1);
          this.ctx.lineTo(s.x2, s.y2);
          this.ctx.stroke();
          break;

        case "arrow":
          drawArrow(this.ctx, s.x1, s.y1, s.x2, s.y2);
          break;

        case "diamond":
          drawDiamond(this.ctx, s.x, s.y, s.width, s.height);
          break;

        case "circle":
          this.ctx.beginPath();
          this.ctx.arc(s.centerX, s.centerY, s.radius, 0, Math.PI * 2);
          this.ctx.stroke();
          break;

        case "ellipse":
          this.ctx.beginPath();
          this.ctx.ellipse(s.centerX, s.centerY, s.radiusX, s.radiusY, 0, 0, Math.PI * 2);
          this.ctx.stroke();
          break;

        case "pencil":
          this.ctx.beginPath();
          for (let i = 0; i < s.points.length - 1; i++) {
            this.ctx.moveTo(s.points[i].x, s.points[i].y);
            this.ctx.lineTo(s.points[i + 1].x, s.points[i + 1].y);
          }
          this.ctx.stroke();
          break;

        case "text":
          this.ctx.fillStyle = s.color || "#fff";
          this.ctx.font = `${s.fontSize || 16}px sans-serif`;
          this.ctx.textBaseline = "top";
          console.log("Drawing text:", s.text, "at", s.x, s.y, "color:", s.color);
          this.ctx.fillText(s.text, s.x, s.y);
          break;
      }

      this.ctx.restore();
    }
  }



  // ================= EVENTS =================
  private getPos(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  private onMouseDown = (e: MouseEvent) => {
    const pos = this.getPos(e);

    if (this.tool === "text" && this.textarea) {
      this.textX = pos.x;
      this.textY = pos.y;

      this.textarea.style.display = "block";
      this.textarea.style.left = `${pos.x}px`;
      this.textarea.style.top = `${pos.y}px`;

      this.isTyping = true;

      setTimeout(() => {
        this.textarea?.focus();
      }, 0);

      return;
    }

    this.clicked = true;
    this.startX = pos.x;
    this.startY = pos.y;

    if (this.tool === "pencil") {
      this.path = [pos];
    }
  };



  //Calculate point Near Line
  private pointNearLine(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    const param = lenSq !== 0 ? dot / lenSq : -1;

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    return distance(px, py, xx, yy) <= this.eraserSize;
  }


  // Shape hit Distance...
  private isShapeHit(shape: Shape, pos: { x: number; y: number }) {
    const { x, y } = pos;

    switch (shape.type) {
      case "rectangle":
        return (
          x >= shape.x - this.eraserSize &&
          x <= shape.x + shape.width + this.eraserSize &&
          y >= shape.y - this.eraserSize &&
          y <= shape.y + shape.height + this.eraserSize
        );

      case "circle":
        return (
          distance(x, y, shape.centerX, shape.centerY) <=
          shape.radius + this.eraserSize
        );

      case "line":
      case "arrow":
        return this.pointNearLine(
          x, y,
          shape.x1, shape.y1,
          shape.x2, shape.y2
        );

      default:
        return false;
    }
  }


//mousemove event in canvas............
  private onMouseUp = (e: MouseEvent) => {
    if (!this.clicked) return;
    this.clicked = false;

    const pos = this.getPos(e);
    const dx = pos.x - this.startX;
    const dy = pos.y - this.startY;

    let shape: Shape | null = null;

    switch (this.tool) {
      case "rectangle":
        shape = {
          id: crypto.randomUUID(),
          type: "rectangle",
          x: this.startX,
          y: this.startY,
          width: dx,
          height: dy,
          color: this.color,
          strokeWidth: this.strokeWidth,
          strokeStyle: this.strokeStyle
        };
        break;

      case "line":
        shape = {
          id: crypto.randomUUID(),
          type: "line",
          x1: this.startX,
          y1: this.startY,
          x2: pos.x,
          y2: pos.y,
          color: this.color,
          strokeWidth: this.strokeWidth,
          strokeStyle: this.strokeStyle
        };
        break;

      case "arrow":
        shape = {
          id: crypto.randomUUID(),
          type: "arrow",
          x1: this.startX,
          y1: this.startY,
          x2: pos.x,
          y2: pos.y,
          color: this.color,
          strokeWidth: this.strokeWidth,
          strokeStyle: this.strokeStyle
        };
        break;

      case "diamond":
        shape = {
          id: crypto.randomUUID(),
          type: "diamond",
          x: this.startX,
          y: this.startY,
          width: dx,
          height: dy,
          color: this.color,
          strokeWidth: this.strokeWidth,
          strokeStyle: this.strokeStyle
        };
        break;

      case "circle":
        if (e.shiftKey) {
          shape = {
            id: crypto.randomUUID(),
            type: "circle",
            centerX: this.startX,
            centerY: this.startY,
            radius: Math.sqrt(dx * dx + dy * dy),
            color: this.color,
            strokeWidth: this.strokeWidth,
            strokeStyle: this.strokeStyle
          };
        } else {
          shape = {
            id: crypto.randomUUID(),
            type: "ellipse",
            centerX: this.startX,
            centerY: this.startY,
            radiusX: Math.abs(dx),
            radiusY: Math.abs(dy),
            color: this.color,
            strokeWidth: this.strokeWidth,
            strokeStyle: this.strokeStyle
          };
        }
        break;

      case "pencil":
        shape = {
          id: crypto.randomUUID(),
          type: "pencil",
          points: this.path,
          color: this.color,
          strokeWidth: this.strokeWidth,
          strokeStyle: this.strokeStyle
        };
        break;
    }

    if (!shape) return;
    // this.shapes.push(shape);
    // this.redraw();
    if (!this.shapes.find(s => s.id === shape.id)) {
      this.shapes.push(shape);
      this.redraw();
    }
    this.send(shape);
  };


//mousemove event in canvas.................
  private onMouseMove = (e: MouseEvent) => {
    if (!this.clicked || this.isTyping) return;

    const pos = this.getPos(e);

    this.redraw();

    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.strokeWidth;
    applyStrokeStyle(this.ctx, this.strokeStyle);

    const dx = pos.x - this.startX;
    const dy = pos.y - this.startY;

    switch (this.tool) {
      case "rectangle":
        this.ctx.strokeRect(this.startX, this.startY, dx, dy);
        break;

      case "line":
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
        break;

      case "arrow":
        drawArrow(this.ctx, this.startX, this.startY, pos.x, pos.y);
        break;

      case "diamond":
        drawDiamond(this.ctx, this.startX, this.startY, dx, dy);
        break;

      case "circle":
        if (e.shiftKey) {
          this.ctx.beginPath();
          this.ctx.arc(this.startX, this.startY, Math.sqrt(dx * dx + dy * dy), 0, Math.PI * 2);
        } else {
          this.ctx.beginPath();
          this.ctx.ellipse(this.startX, this.startY, Math.abs(dx), Math.abs(dy), 0, 0, Math.PI * 2);
        }
        this.ctx.stroke();
        break;

      case "pencil":
        this.path.push(pos);
        this.ctx.beginPath();
        for (let i = 0; i < this.path.length - 1; i++) {
          this.ctx.moveTo(this.path[i].x, this.path[i].y);
          this.ctx.lineTo(this.path[i + 1].x, this.path[i + 1].y);
        }
        this.ctx.stroke();
        break;
    }

    
    // erase functionality
    if (this.tool === "eraser" && this.clicked) {
      const pos = this.getPos(e);

      this.shapes = this.shapes.map(shape => {
        if (shape.type === "pencil") {
          //remove only points near eraser
          const newPoints = shape.points.filter(p =>
            distance(p.x, p.y, pos.x, pos.y) > this.eraserSize
          );

          return {
            ...shape,
            points: newPoints
          };
        }

        //other shapes → remove whole shape if hit
        if (this.isShapeHit(shape, pos)) {
          return null;
        }

        return shape;
      }).filter(Boolean) as Shape[];

      this.redraw();
      return;
    }
  };



  private attachEvents() {
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("mouseup", this.onMouseUp);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.onMouseDown);
    this.canvas.removeEventListener("mouseup", this.onMouseUp);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
  }
}
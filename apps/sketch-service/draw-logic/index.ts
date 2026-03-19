type Shape ={
     type:"rectangle";
     x:number;
     y:number;
     width:number;
    height:number;

} |{
     type:"circle",
     centerX:number;
     centerY:number;
     radius:number;

} | {
     type:"diamond",
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
} | {
   
}

export function Sketch(canvas: HTMLCanvasElement){
    const ctx = canvas.getContext("2d");

           
    let existingShapes : Shape[] =[];


          if(!ctx){
             return;
          }
          ctx.fillStyle="rgba(0,0,0)";
          ctx.fillRect(0, 0, canvas.width , canvas.height);

             // for click the mouse 
              let clicked = false;
              let startX=0;
               let startY =0;


          // mouse down and up logic for canvas
           canvas.addEventListener("mousedown",(e)=>{
               
            console.log("mouse down");

                 clicked = true;
               startX = e.clientX;
              startY = e.clientY;
           })

           canvas.addEventListener("mouseup",(e)=>{
               clicked = false;
             
           })

           canvas.addEventListener("mousemove",(e)=>{
                
            if(clicked){
                 
              const width = e.clientX - startX;
              const hight = e.clientY - startY;

               
              // render the canvas logic
               ctx.clearRect( 0 ,0,canvas.width , canvas.height);
              ctx.fillStyle="rgba(0,0,0)";
               ctx.fillRect(0,0,canvas.width , canvas.height);
               
               ctx.strokeStyle="yellow";
               ctx.strokeRect(startX , startY , width , hight); // for rectangle drawing logic.....;

            }
            

           })
}
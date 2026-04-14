"use client";
import { useState , useEffect } from "react";
import { SketchNavbar } from "@/components/layout/Navbar";
import { SketchSidebar } from "@/components/layout/Sidebar";
import { List } from "lucide-react";
import DrawingCanvas from "../../../../components/canvas/CanvasSocket"; 
import { CanvasRealtimeProps} from "@/types/DrawingShapesTypes";
import { getCurrentUserName } from "@/service/getCurrentDetails";

//Navbar →Canvas(state) → DrawingCanvas → initSketch

export   function Canvas({roomId , token }:CanvasRealtimeProps) {
  const [showPage, setShowPage] = useState(false);
  const [username , setUsername] = useState<string>("");
  const [selectedTool, setSelectedTool] = useState<string>("pen");
  const [color, setColor] = useState<string>("#FFFFFF");
  const [ strokeWidth,setStrokeWidth] = useState<number>(1.5)



  console.log(color);
  console.log(strokeWidth);
  

    useEffect(() => {
       async function fetchUser() {
         try {
           const data = await getCurrentUserName();
           setUsername(data.username);
         } catch (err) {
           console.error(err);
         }
       }
   
       fetchUser();
     }, []);

     console.log(selectedTool);

  return (
    <div className="h-screen w-screen fixed bg-black overflow-hidden">

      <SketchNavbar username={username}  
       onToolSelect={(tool) => setSelectedTool(tool)}
       />


      <div className="pt-16 pl-4 absolute z-20">
        <button
          onClick={() => setShowPage((prev) => !prev)}
          className="text-white hover:text-yellow-400 transition"
        >
          <List size={23} />
        </button>
      </div>

      <SketchSidebar
        isOpen={showPage}
        onClose={() => setShowPage(false)}
        onColorChange={(color) => setColor(color)}
        onStrokeWidthChange={(width) => setStrokeWidth(width)}
      />

      <DrawingCanvas token={token} roomId={roomId} tool={selectedTool} color={color} strokeWidth={strokeWidth} />
    </div>
  );
}
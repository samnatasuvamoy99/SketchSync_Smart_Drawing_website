"use client";
import { useState , useEffect } from "react";
import { SketchNavbar } from "@/components/layout/Navbar";
import { SketchSidebar } from "@/components/layout/Sidebar";
import { List } from "lucide-react";
import DrawingCanvas from "../../../../components/canvas/CanvasSocket"; 
import { CanvasProps } from "@/types/DrawingShapesTypes";
import { getCurrentUserName } from "@/service/getCurrentDetails";


export   function Canvas({roomId , token}:CanvasProps) {
  const [showPage, setShowPage] = useState(false);
  const [username , setUsername] = useState();

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


  return (
    <div className="h-screen w-screen fixed bg-black overflow-hidden">
      <SketchNavbar username={username} />


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
      />

      <DrawingCanvas token={token} roomId={roomId} />
    </div>
  );
}
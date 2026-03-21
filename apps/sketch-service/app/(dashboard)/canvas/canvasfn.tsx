"use client"

import { Pencil, List } from "lucide-react";
import { SketchNavbar } from "@/components/layout/navbar";
import { SketchSidebar } from "@/components/layout/sidebar";
import { useState } from "react";
import MenuIcon from "./listicon";

export default function Layout() {
  const [showPage, setShowPage] = useState(false);

  return (
    <div className="h-screen w-screen bg-black grid-bg relative">

      <div
        style={{
          position: "absolute",
          top: "9%",
          left: "25%",
          width: 560,
          height: 560,
          background: "radial-gradient(circle, rgba(255,215,0,0.18) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />


      <SketchNavbar />


      <div className="relative z-[200] flex flex-col pt-16 pl-4">

        <List size={27} onClick={() => {
          console.log("clicked");
          setShowPage(prev => !prev)
        }} className="text-white" />


        {showPage && (
          <div className="fixed top-0 left-0 bg-red-500 text-white z-[9999]">
            WORKING
          </div>
        )}

      </div>



      <div className=" flex justify-center items-center mt-20 ">
        <div>
          <Pencil size={18} className=" w-24 rounded-md h-16 opacity-50 font-bold text-white bg-rgba(255,215,0,0.18) 0%, transparent 70%" />
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <div className="text-white font-semibold   font-mono text-2xl ">
          Welcome Back,Nabanita Bera!

        </div>



      </div>

      <div className="text-white flex mt-3 font-normal font-serif subpixel-antialiased italic justify-center items-center">
        pick a shape,choose a color,and start drawing -or
        <br />


        invite your team to sketch together i real time.

      </div>

      <div className="text-gold-200 underline-offset-8 uppercase pt-3 italic flex justify-center items-center text-2xl shadow-2xl opacity-23">
        𝓒𝓵𝓲𝓬𝓴 𝓪 𝓼𝓱𝓪𝓹𝓮 𝓪𝓫𝓸𝓿𝓮 · 𝓭𝓻𝓪𝓰 𝓽𝓸 𝓭𝓻𝓪𝔀 · 𝓬𝓸𝓵𝓵𝓪𝓫𝓸𝓻𝓪𝓽𝓮
      </div>
    </div>
  );
}
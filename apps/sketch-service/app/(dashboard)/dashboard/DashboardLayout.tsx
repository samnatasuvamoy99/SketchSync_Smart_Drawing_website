

"use client";

import { Pencil, List } from "lucide-react";
import { SketchNavbar } from "@/components/layout/Navbar";
import { SketchSidebar } from "@/components/layout/Sidebar";
import { useState, useEffect } from "react";
import { getCurrentUserName } from "@/service/getCurrentDetails";

export default function Layout() {
  const [showPage, setShowPage] = useState(true);
  const [username, setUsername] = useState<string>("");

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
    <div className="h-screen w-screen bg-black relative overflow-hidden">

      {/* BACKGROUND (FIXED) */}
      <div
        className="absolute z-0"
        style={{
          top: "9%",
          left: "25%",
          width: 560,
          height: 560,
          background:
            "radial-gradient(circle, rgba(255,215,0,0.18) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/*NAVBAR (ALWAYS ON TOP) */}
      
        <SketchNavbar username={username} />
      

      {/*LIST BUTTON */}
      <div className="relative z-50 flex pt-16 pl-4">
        <button
          onClick={() => setShowPage(true)}
          className="text-white hover:text-yellow-400 transition"
        >
          <List size={23} />
        </button>
      </div>

      {/* SIDEBAR */}
      {showPage && (
        <SketchSidebar
          isOpen={showPage}
          onClose={() => setShowPage(false)}
        />
      )}

     
      <div className="relative z-10 flex flex-col items-center mt-20">
        <Pencil size={48} className="opacity-50 text-yellow-400" />

        <div className="text-white font-semibold font-mono text-2xl mt-4">
          Welcome Back, {username || "User"}!
        </div>

        <div className="text-white mt-3 font-normal font-serif italic text-center">
          Pick a shape, choose a color, and start drawing — or
          <br />
          invite your team to sketch together in real time.
        </div>

        <div className="pt-3 italic text-2xl opacity-20 text-yellow-200">
          𝓒𝓵𝓲𝓬𝓴 𝓪 𝓼𝓱𝓪𝓹𝓮 𝓪𝓫𝓸𝓿𝓮 · 𝓭𝓻𝓪𝓰 𝓽𝓸 𝓭𝓻𝓪𝔀 · 𝓬𝓸𝓵𝓵𝓪𝓫𝓸𝓻𝓪𝓽𝓮
        </div>
      </div>

    </div>
  );
}
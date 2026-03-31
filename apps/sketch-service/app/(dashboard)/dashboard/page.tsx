"use client"

import { useState } from "react";

import { RoomCard } from "@/components/room/RoomCard";

export default function page() {
     const [open , setopen] = useState(true);

  return (
    <div className="h-screen w-screen bg-black">
          <RoomCard  isOpen={open}
      onClose={() => setopen(true)}/>
    </div>
  )
}
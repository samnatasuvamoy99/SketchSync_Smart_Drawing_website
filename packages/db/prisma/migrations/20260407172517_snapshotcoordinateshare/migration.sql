-- CreateTable
CREATE TABLE "Snapshot" (
    "id" SERIAL NOT NULL,
    "roomId" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Snapshot_roomId_idx" ON "Snapshot"("roomId");

-- AddForeignKey
ALTER TABLE "Snapshot" ADD CONSTRAINT "Snapshot_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

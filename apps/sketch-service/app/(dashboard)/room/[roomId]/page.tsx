
import { Canvas } from "./Canvas"
import { cookies } from "next/headers";

export default async function page({
    params,
}: {
    params: {
        roomId: string
    }
}) {
    const roomId = (await params).roomId;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log("room-id", roomId);
    console.log(token);

    return <Canvas token={token} roomId={roomId} />;
}
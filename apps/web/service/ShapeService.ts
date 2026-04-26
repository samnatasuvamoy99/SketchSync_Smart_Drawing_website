import { BACKEND_URL } from "@/config";
import { Shape } from "@/types/DrawingShapesTypes";

// // DB response type
// interface Coordinate {
//   id: number;
//   roomId: string;
//   coordinates: string; //correct field
// }

// export async function getExistingShapes(
//   roomId: string
// ): Promise<Shape[]> {
//   const res = await fetch(
//     `${BACKEND_URL}/drawingShapes/v4/canvas/coordinate/${roomId}`,
//     {
//       method: "GET",
//     }
//   );

//   const data = await res.json();

//   console.log("API RESPONSE:", data);

//   const shapes: Shape[] = (data?.Coordinate || [])
//     .map((item: Coordinate) => {
//       try {
//         const parsed = JSON.parse(item.coordinates); // parse string

//         return parsed?.shape || null; //extract shape safely
//       } catch {
//         return null; // handle bad JSON
//       }
//     })
//     .filter((shape:any): shape is Shape => {
//       return (
//         shape !== null &&
//         typeof shape === "object" &&
//         "type" in shape
//       );
//     });

//   return shapes;
// }




interface Coordinate {
  id: string;
  roomId: string;
  coordinates: any;
}

export async function getExistingShapes(roomId: string): Promise<Shape[]> {
  const res = await fetch(
    `${BACKEND_URL}/drawingShapes/v4/canvas/coordinate/${roomId}`,
    { method: "GET" }
  );

  const data = await res.json();

  console.log("API RESPONSE:", data);

  const shapes: Shape[] = (data?.Coordinate || [])
    .map((item: Coordinate) => {
      const coord = item.coordinates;

      // ✅ Handle BOTH formats safely
      if (!coord) return null;

      if (coord.shape) return coord.shape; // old format
      if (coord.type) return coord;        // new format

      return null;
    })
    .filter((shape: any): shape is Shape => {
      return (
        shape !== null &&
        typeof shape === "object" &&
        "type" in shape
      );
    });

  return shapes;
}
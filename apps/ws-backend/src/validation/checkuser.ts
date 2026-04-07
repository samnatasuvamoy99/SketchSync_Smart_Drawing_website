import jwt from "jsonwebtoken";

export function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD!);

    console.log(decoded);

    if (typeof decoded === "string") return null;

    const payload = decoded as { id: string };
    return payload.id ?? null;

  } catch (err) {
    console.log("JWT ERROR:", err);
    return null;
  }
}
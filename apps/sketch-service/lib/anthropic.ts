export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

export async function askClaude(
  messages: ClaudeMessage[],
  system?: string
): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      ...(system ? { system } : {}),
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!res.ok) throw new Error(`Claude API error: ${res.status}`);

  const data = await res.json();
  return (
    data.content
      ?.map((b: { type: string; text?: string }) =>
        b.type === "text" ? b.text ?? "" : ""
      )
      .join("") ?? "Something went wrong — please try again."
  );
}

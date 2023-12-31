import { NextResponse } from "next/server";

export const POST = async (requst: Request) => {
  const { question } = await requst.json();

  try {
    const response = await fetch("https://api.apenai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Ты ассистент по знаниям, который предоставляет качественную информацию.",
          },
          {
            role: "user",
            content: `Скажи мне ${question}`,
          },
        ],
      }),
    });
    const responseData = await response.json();
    const reply = responseData.choises[0].message.content;
    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message });
  }
};

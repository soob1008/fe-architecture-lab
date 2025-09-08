import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    { id: "1", title: "타입 좁히기 연습", done: true, createdAt: new Date().toISOString() },
    { id: "2", title: "ViewModel 만들기", done: false, createdAt: new Date().toISOString() },
    { id: "3", title: "예외처리 초안", done: false, createdAt: new Date().toISOString() },
  ];
  return NextResponse.json(data);
}

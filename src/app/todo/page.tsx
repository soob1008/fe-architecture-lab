"use client";

import { useEffect, useState } from "react";
import TodoList from "@/features/todo/components/TodoList";
import { fetchTodos } from "@/features/todo/services/todoService";
import { isHttpError } from "@/shared/error/AppError";
import type { TodoVM } from "@/entities/todo/vm/TodoVM";
import type { AppError } from "@/shared/error/AppError";

export default function Day2TodoPage() {
  const [data, setData] = useState<TodoVM[] | null>(null);
  const [error, setError] = useState<AppError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    fetchTodos({ signal: ac.signal })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, []);

  // VM의 순수 메서드로 UI만 토글(서버 반영 X 데모)
  const handleToggle = (id: string) => {
    setData((prev) => (prev ? prev.map((t) => (t.id === id ? t.toggle() : t)) : prev));
  };

  if (loading) return <main style={{ padding: 24 }}>로딩…</main>;
  if (error) {
    const msg = isHttpError(error) ? `HTTP ${error.status}` : error.kind;
    return (
      <main style={{ padding: 24 }}>
        <p>불러오기 실패: {msg}</p>
        <button onClick={() => location.reload()}>다시 시도</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Day 2 — Todo (가장 단순)</h1>
      <TodoList todos={data ?? []} onToggle={handleToggle} />
    </main>
  );
}

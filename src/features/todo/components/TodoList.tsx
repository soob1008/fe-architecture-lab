"use client";
import type { TodoVM } from "@/entities/todo/vm/TodoVM";

export default function TodoList({
  todos,
  onToggle,
}: {
  todos: TodoVM[];
  onToggle: (id: string) => void;
}) {
  return (
    <ul style={{ lineHeight: 1.8 }}>
      {todos.map((t) => (
        <li key={t.id}>
          <label style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => onToggle(t.id)}
              style={{ marginRight: 8 }}
            />
            <strong>{t.title}</strong>{" "}
            <small>
              · {t.statusLabel} · {t.dateText}
            </small>
          </label>
        </li>
      ))}
    </ul>
  );
}

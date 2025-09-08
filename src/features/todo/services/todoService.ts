import type { TodoDto } from "@/entities/todo/model/types";
import { TodoVM } from "@/entities/todo/vm/TodoVM";
import { http } from "@/shared/api/http";

export async function fetchTodos(init?: { signal?: AbortSignal }): Promise<TodoVM[]> {
  const list = await http<TodoDto[]>("/api/todos", { signal: init?.signal });
  return list.map((dto) => new TodoVM(dto));
}

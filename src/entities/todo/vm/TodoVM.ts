import { TodoDto } from "../model/types";

export class TodoVM {
  constructor(private readonly dto: TodoDto) {}

  get id() {
    return this.dto.id;
  }
  get title() {
    return this.dto.title.trim() || "(제목 없음)";
  }
  get done() {
    return this.dto.done;
  }
  get statusLabel() {
    return this.dto.done ? "완료" : "미완료";
  }
  get dateText() {
    const d = new Date(this.dto.createdAt);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("ko-KR");
  }

  toggle(): TodoVM {
    return new TodoVM({ ...this.dto, done: !this.dto.done });
  }
}

type Shape = { kind: "circle"; radius: number } | { kind: "rect"; w: number; h: number };

export function area(s: Shape) {
  if (s.kind === "circle") {
    return Math.PI * s.radius ** 2;
  }

  return s.w * s.h;
}

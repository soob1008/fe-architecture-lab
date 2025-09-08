export type AppError =
  | { kind: "Network"; message: string }
  | { kind: "Http"; status: number; message?: string }
  | { kind: "Canceled" }
  | { kind: "Parse"; message: string }
  | { kind: "Unknown"; message: string };

// 런타임에서 AppError 여부 판별
export function isAppError(e: unknown): e is AppError {
  return typeof e === "object" && e !== null && "kind" in e;
}

// 특정 종류 가드 (http 로 좁히기)
export function isHttpError(e: unknown): e is Extract<AppError, { kind: "Http" }> {
  return isAppError(e) && e.kind === "Http";
}

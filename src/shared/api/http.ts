import { AppError, isAppError } from "@/shared/error/AppError";
import { hasKey, isRecord } from "@/shared/lib/guards";

export async function http<T>(
  input: RequestInfo,
  init?: RequestInit & { signal?: AbortSignal },
): Promise<T> {
  try {
    const res = await fetch(input, init);

    // HTTP 에러를 AppError로 변환
    if (!res.ok) {
      let message: string | undefined;
      try {
        const body = await res.json();
        if (isRecord(body) && hasKey(body, "message") && typeof body.message === "string") {
          message = body.message;
        }
      } catch {
        // 본문이 JSON이 아닐 수도 있음 → 메시지 없음
      }
      throw <AppError>{ kind: "Http", status: res.status, message };
    }

    // JSON 파싱 에러도 AppError로
    try {
      return (await res.json()) as T;
    } catch (e: any) {
      throw <AppError>{ kind: "Parse", message: "Invalid JSON response" };
    }
  } catch (err: any) {
    if (err?.name === "AbortError") throw <AppError>{ kind: "Canceled" };
    if (isAppError(err)) throw err;
    if (err instanceof TypeError) throw <AppError>{ kind: "Network", message: err.message };
    throw <AppError>{ kind: "Unknown", message: String(err?.message ?? err) };
  }
}

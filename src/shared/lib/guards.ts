// 타입 가드 모음

// 값이 비어있지 않은 문자열인지 가드
export function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

// 객체 레코드인지 (null/ array 아니다.)
export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

// 객체에 키가 존재하는지 (런타임 체크 + 타입 좁히기)
export function hasKey<T extends object, K extends PropertyKey>(
  obj: T,
  key: K,
): obj is T & Record<K, unknown> {
  return key in obj;
}

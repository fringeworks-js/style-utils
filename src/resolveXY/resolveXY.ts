/**
 * 共通値・X値・Y値からX軸とY軸の値を確定する。
 * 軸別の値が未指定（undefined）の場合は共通値にフォールバックする。
 */
export default function resolveXY<T>(
  common: T | undefined,
  x: T | undefined,
  y: T | undefined,
): { x: T | undefined; y: T | undefined } {
  return { x: x ?? common, y: y ?? common };
}

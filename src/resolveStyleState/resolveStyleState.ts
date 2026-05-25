import type { StyleState } from '../types';

/**
 * StyleState の値を特定の状態について解決する
 *
 * - 単純値の場合: 'base' のときのみ値を返す
 *   （他の状態は undefined を返し、CSS 側のフォールバックに委ねる）
 * - オブジェクトの場合: 指定された状態のキーの値を返す
 */
export default function resolveStyleState<T, S extends string>(
  value: StyleState<T, S> | undefined,
  state: 'base' | S,
): T | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (typeof value !== 'object' || value === null) {
    return state === 'base' ? (value as T) : undefined;
  }
  const obj = value as Partial<Record<'base' | S, T>>;
  return obj[state];
}

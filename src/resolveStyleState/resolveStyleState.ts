import type { StyleState, StyleStateRecord } from '../types';

/**
 * StyleState の値を特定の状態について解決する
 *
 * - 単純値（T）の場合: 常にvalueを返す
 * - StyleStateRecord の場合: 指定された状態のキーの値を返す
 */
export default function resolveStyleState<T, S extends string>(
  value: StyleState<T, S> | undefined,
  state: 'base' | S,
): T | undefined {
  if (value == null) {
    return undefined;
  } else if (typeof value !== 'object') {
    return value as T;
  } else {
    const obj = value as StyleStateRecord<T, S>;
    return obj[state];
  }
}

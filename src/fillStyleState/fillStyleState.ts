import type { StyleState, StyleStateRecord } from '../types';

/**
 * StyleState を受け取り、value と defaultValue から値が決まったステートだけを埋めた
 * StyleStateRecord を返す。
 * 値が決まらなかったステートは含めない（利用するライブラリの既定値に委ねる）。
 *
 * - 単純値（T）の場合: 全ステートに同じ値を設定する（defaultValue は使わない）
 * - StyleStateRecord の場合: 未設定ステートに defaultValue[state] を設定
 * - undefined の場合: defaultValue を value と同様に処理
 *
 * value に単純値のリテラル（`8` や `'red'` など）を直接渡すと T を正しく推論できないため、
 * 型引数を明示する。型が決まった変数（オプションの値など）を渡す場合は不要。
 *
 * @param value - 変換元の StyleState 値
 * @param states - base 以外の全ステート名の配列（型 S の全候補を列挙）
 * @param defaultValue - value で省略したステートを補う値（T または StyleStateRecord でステート別に指定可能）
 *
 * @example
 * fillStyleState<number, 'hover'>(8, ['hover'])
 * // → { base: 8, hover: 8 }
 *
 * fillStyleState({ base: 4 }, ['hover'])
 * // → { base: 4 }
 *
 * fillStyleState({ base: 4, hover: 8 }, ['hover'])
 * // → { base: 4, hover: 8 }
 *
 * fillStyleState({ hover: 8 }, ['hover'])
 * // → { hover: 8 }  （base 未設定・defaultValue なしのため base の補完なし）
 *
 * fillStyleState({ hover: 8 }, ['hover'], 2)
 * // → { base: 2, hover: 8 }  （base 未設定のため defaultValue で補完）
 *
 * fillStyleState({ hover: 8 }, ['hover'], { base: 2, hover: 3 })
 * // → { base: 2, hover: 8 }  （hover は value 優先、base は defaultValue.base で補完）
 *
 * fillStyleState(undefined, ['hover'], { base: 2, hover: 3 })
 * // → { base: 2, hover: 3 }
 */
export default function fillStyleState<T, S extends string>(
  value: StyleState<T, S> | undefined,
  states: readonly S[],
  defaultValue?: StyleState<T, S>,
): StyleStateRecord<T, S> {
  // valueが未指定: defaultValue を value として処理する
  if (value === undefined) {
    return defaultValue === undefined
      ? {}
      : fillStyleState(defaultValue, states);
  }

  // valueが単純値（T）: 全ステートに同じ値を設定（defaultValue は使わない）
  if (_isSingleValue(value)) {
    const base = value as T;
    const filled = { base } as Partial<Record<'base' | S, T>>;
    for (const state of states) {
      filled[state] = base;
    }
    return filled as StyleStateRecord<T, S>;
  }

  // valueがStyleStateRecord<T, S>: ステート毎の値を設定
  const allStates: ('base' | S)[] = ['base', ...states];
  const record = value as Partial<Record<'base' | S, T>>;
  const filled: Partial<Record<'base' | S, T>> = {};
  for (const state of allStates) {
    const stateValue = resolveValue(record[state], state, defaultValue);
    if (stateValue !== undefined) {
      filled[state] = stateValue;
    }
  }
  return filled as StyleStateRecord<T, S>;
}

// defaultValue から特定ステートの値を解決するヘルパー
// - 単純値（T）の場合: 全ステートに同じ値を返す
// - StyleStateRecord<T, S> の場合: state の値
function resolveValue<T, S extends string>(
  value: T,
  state: 'base' | S,
  defaultValue?: StyleState<T, S>,
): T | undefined {
  if (value !== undefined) {
    return value;
  }
  if (defaultValue === undefined) {
    return undefined;
  }
  if (_isSingleValue(defaultValue)) {
    return defaultValue as T;
  }
  return (defaultValue as StyleStateRecord<T, S>)[state];
}

function _isSingleValue<T, S extends string>(value: StyleState<T, S>) {
  return typeof value !== 'object' || value === null;
}

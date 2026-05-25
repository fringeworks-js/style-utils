/**
 * style-xxx系ライブラリで使用する、状態に応じて異なる値を持つスタイルの型
 *
 * - T: スタイルの値の型
 * - S: 状態の種類 ('hover' | 'focus' など)
 *
 * 単純値を渡した場合は base 状態にのみ適用され、
 * その他の状態は CSS 側のフォールバックに委ねられる。
 *
 * @example
 * // 全状態で同じ値（ホバーアニメーションなし）
 * const v: StyleState<number, 'hover'> = 8
 *
 * // 状態別に値を指定
 * const v: StyleState<number, 'hover'> = { base: 4, hover: 8 }
 *
 * // hover のみ指定（base はライブラリのデフォルト）
 * const v: StyleState<number, 'hover'> = { hover: 8 }
 */
export type StyleState<T, S extends string> =
  | T
  | ({ base?: T } & { [K in S]?: T });

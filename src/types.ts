import type { CSSCustomProperties } from '@fringeworks/web-utils';

/**
 * style-xxx系ライブラリで使用する、状態をキーとするスタイル値のレコード型
 *
 * - T: スタイルの値の型
 * - S: 状態の種類 ('hover' | 'focus' など)
 *
 * @example
 * const v: StyleStateRecord<number, 'hover'> = { base: 4, hover: 8 }
 * const v: StyleStateRecord<number, 'hover'> = { hover: 8 }  // base はライブラリのデフォルト
 */
export type StyleStateRecord<T, S extends string> = { base?: T } & {
  [K in S]?: T;
};

/**
 * style-xxx系ライブラリで使用する、状態に応じて異なる値を持つスタイルの型
 *
 * - T: スタイルの値の型（number, string など）
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
export type StyleState<T, S extends string> = T | StyleStateRecord<T, S>;

/**
 * コンテナオプションに子要素スタイルオプションをフラットにマージする型
 *
 * - I: 子要素側のオプション（`> *` に適用されるスタイル）
 * - C: コンテナ側のオプション
 *
 * @example
 * type ContainerOptions = WithChildStyle<ItemOptions, { axis?: 'x' | 'y' }>;
 * // ContainerOptions = { axis?: 'x' | 'y'; align?: SnapAlign; ... }
 */
export type WithChildStyle<I, C extends object = {}> = C & I;

/**
 * 結果のスタイル
 */
export type StyleResult = {
  /**
   * クラス
   */
  className?: string;

  /**
   * スタイル
   */
  style?: CSSCustomProperties;
};

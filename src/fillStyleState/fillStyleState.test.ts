import fillStyleState from './fillStyleState';

type State = 'hover' | 'active';

const states: State[] = ['hover', 'active'];
const fill = fillStyleState<number, State>;

describe('fillStyleState', () => {
  describe('単純値', () => {
    it('全ステートに同じ値を設定する', () => {
      expect(fill(8, states)).toEqual({
        base: 8,
        hover: 8,
        active: 8,
      });
    });

    it('defaultValue は使わない', () => {
      expect(fill(8, states, { hover: 3 })).toEqual({
        base: 8,
        hover: 8,
        active: 8,
      });
    });
  });

  describe('StyleStateRecord', () => {
    it('defaultValue が無い場合は指定したステートだけを設定する', () => {
      expect(fill({ base: 4 }, states)).toEqual({ base: 4 });
      expect(fill({ hover: 8 }, states)).toEqual({ hover: 8 });
    });

    it('未設定のステートを単純値の defaultValue で補う', () => {
      expect(fill({ hover: 8 }, states, 2)).toEqual({
        base: 2,
        hover: 8,
        active: 2,
      });
    });

    it('未設定のステートを StyleStateRecord の defaultValue で補う', () => {
      expect(fill({ hover: 8 }, states, { base: 2, hover: 3 })).toEqual({
        base: 2,
        hover: 8,
      });
    });
  });

  describe('undefined', () => {
    it('defaultValue が無い場合は空のオブジェクトを返す', () => {
      expect(fill(undefined, states)).toEqual({});
    });

    it('defaultValue が単純値の場合は全ステートに設定する', () => {
      expect(fill(undefined, states, 2)).toEqual({
        base: 2,
        hover: 2,
        active: 2,
      });
    });

    it('defaultValue が StyleStateRecord の場合はそのまま設定する', () => {
      expect(fill(undefined, states, { base: 2, hover: 3 })).toEqual({
        base: 2,
        hover: 3,
      });
    });
  });
});

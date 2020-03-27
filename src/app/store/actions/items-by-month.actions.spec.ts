import * as fromItemsByMonth from './items-by-month.actions';

describe('loadItemsByMonths', () => {
  it('should return an action', () => {
    expect(fromItemsByMonth.loadItemsByMonths().type).toBe('[ItemsByMonth] Load ItemsByMonths');
  });
});

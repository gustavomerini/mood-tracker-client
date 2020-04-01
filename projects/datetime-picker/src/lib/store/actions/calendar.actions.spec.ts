import * as fromCalendar from './calendar.actions';

describe('loadCalendars', () => {
  it('should return an action', () => {
    expect(fromCalendar.loadCalendars().type).toBe('[Calendar] Load Calendars');
  });
});

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ItemsByMonthEffects } from './items-by-month.effects';

describe('ItemsByMonthEffects', () => {
  let actions$: Observable<any>;
  let effects: ItemsByMonthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemsByMonthEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ItemsByMonthEffects>(ItemsByMonthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

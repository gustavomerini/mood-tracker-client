import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtTestComponent } from './dt-test.component';

describe('DtTestComponent', () => {
  let component: DtTestComponent;
  let fixture: ComponentFixture<DtTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

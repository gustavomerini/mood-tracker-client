import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemDateComponent } from './list-item-date.component';

describe('ListItemDateComponent', () => {
  let component: ListItemDateComponent;
  let fixture: ComponentFixture<ListItemDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DerPostillionComponent } from './der-postillion.component';

describe('DerPostillionComponent', () => {
  let component: DerPostillionComponent;
  let fixture: ComponentFixture<DerPostillionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DerPostillionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DerPostillionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KursDetailComponent } from './kurs-detail.component';

describe('KursDetailComponent', () => {
  let component: KursDetailComponent;
  let fixture: ComponentFixture<KursDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KursDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KursDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

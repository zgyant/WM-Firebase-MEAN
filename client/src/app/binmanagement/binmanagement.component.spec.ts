import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinmanagementComponent } from './binmanagement.component';

describe('BinmanagementComponent', () => {
  let component: BinmanagementComponent;
  let fixture: ComponentFixture<BinmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

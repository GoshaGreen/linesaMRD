import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitstableComponent } from './visitstable.component';

describe('VisitstableComponent', () => {
  let component: VisitstableComponent;
  let fixture: ComponentFixture<VisitstableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitstableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

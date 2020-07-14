import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfierComponent } from './verfier.component';

describe('VerfierComponent', () => {
  let component: VerfierComponent;
  let fixture: ComponentFixture<VerfierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerfierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerfierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

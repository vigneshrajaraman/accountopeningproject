import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfierDialogComponent } from './verfier-dialog.component';

describe('VerfierDialogComponent', () => {
  let component: VerfierDialogComponent;
  let fixture: ComponentFixture<VerfierDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerfierDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerfierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAnouncesComponent } from './manage-anounces.component';

describe('ManageAnouncesComponent', () => {
  let component: ManageAnouncesComponent;
  let fixture: ComponentFixture<ManageAnouncesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAnouncesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAnouncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

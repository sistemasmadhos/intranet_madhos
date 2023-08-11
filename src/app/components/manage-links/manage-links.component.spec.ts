import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLinksComponent } from './manage-links.component';

describe('ManageLinksComponent', () => {
  let component: ManageLinksComponent;
  let fixture: ComponentFixture<ManageLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

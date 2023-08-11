import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDocumentsComponent } from './container-documents.component';

describe('ContainerDocumentsComponent', () => {
  let component: ContainerDocumentsComponent;
  let fixture: ComponentFixture<ContainerDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTablesDocumentsComponent } from './container-tables-documents.component';

describe('ContainerTablesDocumentsComponent', () => {
  let component: ContainerTablesDocumentsComponent;
  let fixture: ComponentFixture<ContainerTablesDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerTablesDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerTablesDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

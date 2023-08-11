import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerModuleComponent } from './container-module.component';

describe('ContainerModuleComponent', () => {
  let component: ContainerModuleComponent;
  let fixture: ComponentFixture<ContainerModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullIndexComponent } from './full-index.component';

describe('FullIndexComponent', () => {
  let component: FullIndexComponent;
  let fixture: ComponentFixture<FullIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

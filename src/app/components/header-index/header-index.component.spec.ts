import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderIndexComponent } from './header-index.component';

describe('HeaderIndexComponent', () => {
  let component: HeaderIndexComponent;
  let fixture: ComponentFixture<HeaderIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddquestionComponent } from './adminaddquestion.component';

describe('AdminaddquestionComponent', () => {
  let component: AdminaddquestionComponent;
  let fixture: ComponentFixture<AdminaddquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminaddquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

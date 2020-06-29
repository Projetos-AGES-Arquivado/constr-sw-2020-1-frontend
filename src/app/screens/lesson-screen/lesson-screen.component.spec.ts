import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonScreenComponent } from './lesson-screen.component';

describe('LessonScreenComponent', () => {
  let component: LessonScreenComponent;
  let fixture: ComponentFixture<LessonScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

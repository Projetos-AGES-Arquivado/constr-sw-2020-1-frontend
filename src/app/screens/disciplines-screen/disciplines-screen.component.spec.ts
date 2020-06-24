import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinesScreenComponent } from './disciplines-screen.component';

describe('DisciplinesScreenComponent', () => {
  let component: DisciplinesScreenComponent;
  let fixture: ComponentFixture<DisciplinesScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinesScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

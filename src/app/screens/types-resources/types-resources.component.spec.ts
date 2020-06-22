import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesResourcesComponent } from './types-resources.component';

describe('TypesResourcesComponent', () => {
  let component: TypesResourcesComponent;
  let fixture: ComponentFixture<TypesResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

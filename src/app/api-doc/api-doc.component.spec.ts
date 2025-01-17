import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDocComponent } from './api-doc.component';

describe('ApiDocComponent', () => {
  let component: ApiDocComponent;
  let fixture: ComponentFixture<ApiDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiDocComponent]
    });
    fixture = TestBed.createComponent(ApiDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

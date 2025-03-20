import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopcrsalComponent } from './loopcrsal.component';

describe('LoopcrsalComponent', () => {
  let component: LoopcrsalComponent;
  let fixture: ComponentFixture<LoopcrsalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoopcrsalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoopcrsalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

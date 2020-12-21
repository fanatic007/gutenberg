import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GnbGenreCardComponent } from './gnb-genre-card.component';

describe('GnbGenreCardComponent', () => {
  let component: GnbGenreCardComponent;
  let fixture: ComponentFixture<GnbGenreCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GnbGenreCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GnbGenreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

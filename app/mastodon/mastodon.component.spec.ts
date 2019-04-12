import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastodonComponent } from './mastodon.component';

describe('MastodonComponent', () => {
  let component: MastodonComponent;
  let fixture: ComponentFixture<MastodonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastodonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastodonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

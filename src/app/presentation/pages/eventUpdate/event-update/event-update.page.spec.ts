import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventUpdatePage } from './event-update.page';

describe('EventUpdatePage', () => {
  let component: EventUpdatePage;
  let fixture: ComponentFixture<EventUpdatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

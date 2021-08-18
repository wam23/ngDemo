import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import cardsets from '../cardsets';

import { PokerTableComponent } from './poker-table.component';

describe('PokerTableComponent', () => {
  let component: PokerTableComponent;
  let fixture: ComponentFixture<PokerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ PokerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerTableComponent);
    component = fixture.componentInstance;
    component.user = {name: 'User', room: 'Test', cards: cardsets['Fibonacci']};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {Component, OnInit, ViewChild} from '@angular/core';
import cardsets from './cardsets';
import {User} from './poker-lobby/poker-lobby.component';
import {PokerTableComponent} from './poker-table/poker-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './animations.css']
})
export class AppComponent implements OnInit {
  user: User;

  @ViewChild(PokerTableComponent) table: PokerTableComponent;
  pyro = false;
  showSettings = false;

  receiveUser($event): void {
    this.user = $event;
    this.showSettings = false;
    localStorage.setItem('poker', JSON.stringify(this.user));
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('poker')) || {};
    if (!this.user.cards) {
      // migrate to new profile
      this.showSettings = true;
      this.user.cards = cardsets['Simple Fibonacci'];
    }
  }

  logout(): void {
    this.showSettings = true;
  }

  resetSelections(): void {
    this.table.resetSelection();
  }

  showPyro(result): void {
    this.pyro = result;
  }
}

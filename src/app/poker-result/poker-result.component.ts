import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../poker-lobby/poker-lobby.component';

interface Card {
  name: string;
  vote: number;
}

@Component({
  selector: 'app-poker-result',
  templateUrl: './poker-result.component.html',
  styleUrls: ['./poker-result.component.css']
})
export class PokerResultComponent implements OnChanges {

  @Input() user: User;

  @Output() resetSelections = new EventEmitter<Event>();

  cards: Array<Card>;
  mean: number;
  median: number;
  revealor: string;

  private poll$: Subscription;

  constructor(private http: HttpClient) {
  }

  ngOnChanges(): void {
    if (this.poll$) {
      this.poll$.unsubscribe();
      this.cards = [];
    }
    if (this.user.room) {
      this.http.get(`${environment.baseUrl}/poll/${this.user.room}/init`)
        .subscribe();
      this.poll();
    }
  }

  poll(): void {
    this.poll$ = this.http.get(`${environment.baseUrl}/poll/${this.user.room}`)
      .subscribe((response: any) => {

        this.revealor = response.revealor;
        const result = response.result;

        if (result.length === 0) {
          this.resetSelections.emit();
        }

        const votes = result.map(a => a.vote).filter(a => a > 0);

        this.mean = this.calcMean(votes);
        this.median = this.calcMedian(votes);

        this.cards = result.sort((a, b) => a.vote - b.vote);

        this.poll();
      }, error => {
        // Azure has connection timeout of 120s, so this happens often
        console.error(`Polling error: ${error.message}`);
        setTimeout(() => {
          this.poll();
        }, 1000);
      });
  }

  reveal(): void {
    this.http.get(`${environment.baseUrl}/rooms/${this.user.room}/votes`, {
      headers: new HttpHeaders({
        'x-user': this.user.name
      })
    })
      .subscribe();
  }

  reset(): void {
    this.http.get(`${environment.baseUrl}/rooms/${this.user.room}/reset`, {
      headers: new HttpHeaders({
        'x-user': this.user.name
      })
    })
      .subscribe();
  }

  calcMean(array): number {
    return array.reduce((p, c) => p + c, 0) / array.length;
  }

  calcMedian(array): number {
    const sorted = array.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
  }
}

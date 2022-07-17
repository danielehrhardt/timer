import { Component, VERSION } from '@angular/core';
import { map, share, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  rxTime = new Date();
  subscription: Subscription | undefined;

  ngOnInit() {
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe((time) => {
        this.rxTime = time;
      });
  }

  ngAfterViewInit() {
    (document as any).querySelector('video').playbackRate = 1;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

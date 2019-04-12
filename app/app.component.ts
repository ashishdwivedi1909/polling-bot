import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  time = 15;
  timerRunning = false;

  constructor() {}

  onStartTimerClick(): void {
    if (this.timerRunning) {
      return;
    }
    this.timerRunning = true;
    const intervalRef = setInterval(() => {
      this.time--;
      if (this.time === 0) {
        this.time = 15;
        this.timerRunning = false;
        clearInterval(intervalRef);
      }
    }, 1000)
  }
}

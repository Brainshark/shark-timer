import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-timer-controls',
  templateUrl: './timer-controls.component.html',
  styleUrls: ['./timer-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerControlsComponent implements OnInit {
  @ViewChild('alarm') alarmElementRef: ElementRef;
  @Input() timerActive: boolean;

  timerStart$ = new BehaviorSubject<boolean>(false);
  timerEnd$ = new BehaviorSubject<boolean>(false);
  timerReset$ = new BehaviorSubject<number>(0);

  stopwatchStart$ = new BehaviorSubject<boolean>(false);
  stopwatchReset$ = new Subject<void>();

  alarm: HTMLAudioElement;
  alarmEnabled$ = new BehaviorSubject<boolean>(true);
  alarmSounding$ = new BehaviorSubject<boolean>(false);

  fullScreen$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit() {
    this.alarm = this.alarmElementRef.nativeElement;
  }

  startStop() {
    if (this.timerActive) {
      if (!this.timerEnd$.value) {
        this.timerStart$.next(!this.timerStart$.value);
      } else {
        this.stopAlarm();
      }
    } else {
      this.stopwatchStart$.next(!this.stopwatchStart$.value);
    }
  }

  start() {
    if (this.timerActive) {
      this.timerStart$.next(true);
    } else {
      this.stopwatchStart$.next(true);
    }
  }

  stop() {
    if (this.timerActive) {
      this.timerStart$.next(false);
    } else {
      this.stopwatchStart$.next(false);
    }
  }

  reset() {
    if (this.timerActive) {
      this.timerReset$.next(0);
    } else {
      this.stopwatchReset$.next();
    }
  }

  end(timerComplete: boolean) {
    this.timerEnd$.next(timerComplete);
    if (timerComplete) {
      this.startAlarm();
    }
  }

  toggleAlarm() {
    this.alarmEnabled$.next(!this.alarmEnabled$.value);
  }

  startAlarm() {
    if (this.alarmEnabled$.value && !this.alarmSounding$.value) {
      this.alarmSounding$.next(true);
      this.alarm.play();
    }
  }

  stopAlarm() {
    if (this.alarmEnabled$.value && this.alarmSounding$.value) {
      this.alarmSounding$.next(false);
      this.alarm.pause();
    }
  }

  toggleFullscreen() {
    this.fullScreen$.next(!this.fullScreen$.value);
  }

  get started() {
    return this.timerActive ? this.timerStart$.value : this.stopwatchStart$.value;
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, mapTo, scan, startWith, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';

import { TimeDisplayComponent } from '../time-display/time-display.component';
import { TimerControlBase } from '../timer-control-base';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent extends TimerControlBase implements OnInit {
  @ViewChild('timeDisplay') timeDisplay: TimeDisplayComponent;
  percent$: Observable<number>;
  startTime: number = 5 + 1000 * 60 * 5;

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {
    super.ngOnInit();

    this.controls.reset$.subscribe(() => {
      this.resetTimer(this.startTime);
      this.controls.stop();
      this.cd.markForCheck();
    });

    this.timeDisplay.settingTime$.pipe(
      filter(settingTime => settingTime),
    ).subscribe(() => this.controls.stop());

    this.controls.start$.pipe(
      filter(start => start),
    ).subscribe(() => this.timeDisplay.endSetTime());
  }

  resetTimer(startTime: number) {
    this.reset$.next();
    this.controls.end(false);

    this.time$ = this.controls.start$.pipe(
      filter(() => this.active),
      switchMap(start => (start ? this.interval$.pipe(mapTo(10)) : EMPTY)),
      scan((acc, val) => acc - val, startTime),
      startWith(startTime),
      tap(val => {
        if (val === 0) {
          // We only want to sound the alarm if it was already started
          this.controls.end(this.controls.start$.value);
        }
      }),
      takeUntil(this.reset$),
      takeWhile(val => val >= 0),
    );

    this.percent$ = this.time$.pipe(
      map(time => (1 - time / startTime) * 100),
    );
  }

  setTime(startTime: number) {
    this.startTime = startTime;
    this.resetTimer(this.startTime);
  }

}

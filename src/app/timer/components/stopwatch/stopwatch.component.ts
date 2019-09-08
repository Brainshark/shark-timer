import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, timer } from 'rxjs';
import { filter, mapTo, scan, switchMap, takeUntil } from 'rxjs/operators';

import { TimerControlsComponent } from '../timer-controls/timer-controls.component';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopwatchComponent implements OnInit, OnDestroy {
  @Input() controls: TimerControlsComponent;
  @Input() active: boolean;

  time$: Observable<number>;
  start$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  interval$: Observable<number>;
  reset$: Subject<void> = new Subject<void>();
  destroyed$: Subject<void> = new Subject<void>();

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.interval$ = timer(0, 10);
    this.resetTimer();

    this.controls.stopwatchReset$.subscribe(() => {
      this.resetTimer();
      this.controls.stop();
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  resetTimer() {
    this.reset$.next();

    this.time$ = this.controls.stopwatchStart$.pipe(
      filter(() => this.active),
      switchMap(start => (start ? this.interval$.pipe(mapTo(10)) : EMPTY)),
      scan((acc, val) => acc + val, 0),
      takeUntil(this.reset$)
    );
  }

}

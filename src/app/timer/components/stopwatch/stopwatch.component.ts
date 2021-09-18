import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { filter, mapTo, scan, switchMap, takeUntil } from 'rxjs/operators';
import { TimerControlBase } from '../timer-control-base';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopwatchComponent extends TimerControlBase implements OnInit {

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {
    super.ngOnInit();

    this.controls.reset$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.resetTimer();
      this.controls.stop();
      this.cd.markForCheck();
    });
  }

  resetTimer() {
    this.reset$.next();

    this.time$ = this.controls.start$.pipe(
      filter(() => this.active),
      switchMap(start => (start ? this.interval$.pipe(mapTo(10)) : EMPTY)),
      scan((acc, val) => acc + val, 0),
      takeUntil(this.reset$)
    );
  }

}

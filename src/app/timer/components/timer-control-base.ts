import { ChangeDetectorRef, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { TimerControlsComponent } from './timer-controls/timer-controls.component';

/*
  In Angular 10+, @Directive() would need to be here since the base component uses the
  Angular lifecycle hooks.
*/
// @Directive()
export abstract class TimerControlBase implements OnInit, OnDestroy {
  @Input() controls: TimerControlsComponent;
  @Input() active: boolean;

  time$: Observable<number>;
  start$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  interval$: Observable<number>;
  reset$: Subject<void> = new Subject<void>();

  // protected because we generally wouldn't want outsiders to terminate our observables
  protected destroyed$: Subject<void> = new Subject<void>();

  constructor(protected cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.interval$ = timer(0, 10);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  abstract resetTimer(startTime?: number): void;
}

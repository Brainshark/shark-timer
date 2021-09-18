import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer-controls',
  templateUrl: './timer-controls.component.html',
  styleUrls: ['./timer-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerControlsComponent implements OnInit {
  /*
    One could also use AfterViewInit, but I like doing it this way for most cases so that
    if a viewchild/contentchild has an ngIf, or some other structural directive that makes it come and go,
    then we are sure to have the new reference every time.
  */
  @ViewChild('alarm') set alarmElementRef(value: ElementRef) {
    // In typescript 3.7 we can do value?.nativeElement instead
    this.alarm = value ? value.nativeElement : null;
  }

  // This change was to make it more generic
  @Input() hasAlarm: boolean;
  @Input() fullScreen: boolean;
  @Output() fullScreenChange = new EventEmitter<boolean>();

  start$ = new BehaviorSubject<boolean>(false);
  end$ = new BehaviorSubject<boolean>(false);
  reset$ = new BehaviorSubject<number>(0);

  alarm: HTMLAudioElement;
  alarmEnabled$ = new BehaviorSubject<boolean>(true);
  alarmSounding$ = new BehaviorSubject<boolean>(false);


  protected destroyed$: Subject<void> = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    combineLatest([this.alarmEnabled$, this.alarmSounding$])
      .pipe(takeUntil(this.destroyed$)).subscribe(([alarmEnabled, alarmSounding]) => {
        if (this.alarm) {
          if (alarmEnabled && alarmSounding) {
            this.alarm.play();
          } else {
            this.alarm.pause();
          }
        }
      });
  }

  startStop() {
    if (this.hasAlarm) {
      if (!this.end$.value) {
        this.start$.next(!this.start$.value);
      } else {
        this.stopAlarm();
      }
    } else {
      this.start$.next(!this.start$.value);
    }
  }

  start() {
    this.start$.next(true);
  }

  stop() {
    this.start$.next(false);
  }

  reset() {
    this.reset$.next(0);
  }

  end(timerComplete: boolean) {
    this.end$.next(timerComplete);
    if (timerComplete) {
      this.startAlarm();
    }
  }

  toggleAlarm() {
    this.alarmEnabled$.next(!this.alarmEnabled$.value);
  }

  startAlarm() {
    this.alarmSounding$.next(true);
  }

  stopAlarm() {
    this.alarmSounding$.next(false);
    this.reset();
  }

  toggleFullscreen() {
    this.fullScreen = !this.fullScreen;
    this.fullScreenChange.emit(this.fullScreen);
    this.cdr.markForCheck();
  }
}

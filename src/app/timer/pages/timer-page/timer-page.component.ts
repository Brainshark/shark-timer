import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerPageComponent implements OnInit, OnDestroy {
  selectedTabIndex$ = new BehaviorSubject<number>(0);
  destroyed$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.pipe(
      filter(routeData => !!routeData),
      takeUntil(this.destroyed$),
    ).subscribe(routeData => {
      if (routeData.view === 'timer') {
        this.selectedTabIndex$.next(0);
      } else if (routeData.view === 'stopwatch') {
        this.selectedTabIndex$.next(1);
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  tabChange(selectedTabIndex: number) {
    this.selectedTabIndex$.next(selectedTabIndex);
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TimerControlsComponent } from '../../components';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  /*
    Personally I'm not a huge fan of ViewEncapsulation,
    so I usually set it to ViewEncapsulation.None so I don't have to do ::ng-deep everywhere
  */
})
export class TimerPageComponent implements OnInit, OnDestroy {
  @ViewChild('controls') public controlsComponent: TimerControlsComponent;

  // I add the suffice $ to my observables/subjects as well.
  // I changed this to an object so that it could be using in the ngIf/as syntax. A 0 index would return falsy for the ngIf
  public selectedTabIndex$ = new BehaviorSubject<{ index: number }>({ index: 0});

   // I usually use https://www.npmjs.com/package/@w11k/ngx-componentdestroyed to do observable/subject cleanup, but this works just as well
  public destroyed$: Subject<void> = new Subject<void>();

  public isFullScreen: boolean = false;

  // generally I prefix private variables with and underscore, but I'm fine either way
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.pipe(
      filter(routeData => !!routeData),
      takeUntil(this.destroyed$),
    ).subscribe(routeData => {
      if (routeData.view === 'timer') {
        this.selectedTabIndex$.next({ index: 0 });
      } else if (routeData.view === 'stopwatch') {
        this.selectedTabIndex$.next({ index: 1 });
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  tabChange(selectedTabIndex: number) {
    this.selectedTabIndex$.next({ index: selectedTabIndex });
  }
}

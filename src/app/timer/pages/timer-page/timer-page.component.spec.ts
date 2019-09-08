import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../../material/material.module';
import { StopwatchComponent } from '../../components/stopwatch/stopwatch.component';
import { TimeDisplayComponent } from '../../components/time-display/time-display.component';
import { TimerControlsComponent } from '../../components/timer-controls/timer-controls.component';
import { TimerComponent } from '../../components/timer/timer.component';
import { TimerPageComponent } from './timer-page.component';

describe('TimerPageComponent', () => {
    let component: TimerPageComponent;
    let fixture: ComponentFixture<TimerPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TimerPageComponent,
                TimerComponent,
                StopwatchComponent,
                TimerControlsComponent,
                TimeDisplayComponent,
            ],
            imports: [
                MaterialModule,
                FormsModule,
                RouterTestingModule,
                NoopAnimationsModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

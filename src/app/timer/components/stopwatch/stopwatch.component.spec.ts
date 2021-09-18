import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../../material/material.module';
import { TimeDisplayComponent } from '../time-display/time-display.component';
import { TimerControlsComponent } from '../timer-controls/timer-controls.component';
import { StopwatchComponent } from './stopwatch.component';

describe('StopwatchComponent', () => {
    let component: StopwatchComponent;
    let fixture: ComponentFixture<StopwatchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StopwatchComponent, TimeDisplayComponent, TimerControlsComponent],
            imports: [MaterialModule, FormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StopwatchComponent);
        component = fixture.componentInstance;
        component.controls = TestBed.createComponent(TimerControlsComponent).componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../../material/material.module';
import { TimeDisplayComponent } from '../time-display/time-display.component';
import { TimerControlsComponent } from '../timer-controls/timer-controls.component';
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
    let component: TimerComponent;
    let fixture: ComponentFixture<TimerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimerComponent, TimeDisplayComponent, TimerControlsComponent],
            imports: [MaterialModule, FormsModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerComponent);
        component = fixture.componentInstance;
        component.controls = TestBed.createComponent(TimerControlsComponent).componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

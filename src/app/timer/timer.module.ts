import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';

import { TimerPageComponent } from './pages';
import { TimerRoutingModule } from './timer.routing.module';
import { AppEffects } from './state/effects';
import { metaReducers, reducers } from './state/reducers';
import { StopwatchComponent, TimeDisplayComponent, TimerComponent, TimerControlsComponent } from './components';



@NgModule({
    declarations: [
        TimerComponent,
        StopwatchComponent,
        TimerControlsComponent,
        TimeDisplayComponent,
        TimerPageComponent
    ],
    imports: [ 
        FormsModule,
        CommonModule, 
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([AppEffects]),
        TimerRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatTabsModule,
        MatToolbarModule,
    ],
    exports: [],
    providers: [],
})
export class TimerModule {}
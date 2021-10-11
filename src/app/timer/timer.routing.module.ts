import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimerPageComponent } from './pages';


const routes: Routes = [
    { path: 'timer', component: TimerPageComponent, data: {view: 'timer'} },
    { path: 'stopwatch', component: TimerPageComponent, data: {view: 'stopwatch'} },
    { path: '', redirectTo: '/timer', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimerRoutingModule {}

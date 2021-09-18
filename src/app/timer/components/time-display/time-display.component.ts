import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-time-display',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeDisplayComponent {
  private hourInMs = 3600000;
  private minuteInMs = 60000;
  private secondInMs = 1000;

  @Input() time: number = (12 * this.hourInMs) + (34 * this.minuteInMs) + (56 * 1000) + 780;
  @Input() showHundriths: boolean = true;
  @Input() @HostBinding('class.can-set-time') canSetTime: boolean = false;

  @Output() setTime = new EventEmitter<number>();

  settingTime$ = new BehaviorSubject<boolean>(false);
  inputHours: number;
  inputMinutes: number;
  inputSeconds: number;

  constructor() { }

  inputChange(hours: number, minutes: number, seconds: number) {
    const timeVal = hours * this.hourInMs + minutes * this.minuteInMs + seconds * this.secondInMs;
    this.setTime.emit(timeVal);
  }

  startSetTime() {
    if (this.canSetTime) {
      this.settingTime$.next(true);
      this.inputHours = this.hours;
      this.inputMinutes = this.minutes;
      this.inputSeconds = this.seconds;
    }
  }
  endSetTime() {
    this.settingTime$.next(false);
  }

  get hours(): number {
    return Math.floor(this.time / this.hourInMs);
  }

  get hoursDigitTwo(): number {
    return this.digitTwo(this.hours);
  }
  get hoursDigitOne(): number {
    return this.digitOne(this.hours);
  }

  get minutes(): number {
    return Math.floor((this.time / this.minuteInMs) % 60);
  }

  get minutesDigitTwo(): number {
    return this.digitTwo(this.minutes);
  }
  get minutesDigitOne(): number {
    return this.digitOne(this.minutes);
  }

  get seconds(): number {
    return Math.floor((this.time / this.secondInMs) % 60);
  }

  get secondsDigitTwo(): number {
    return this.digitTwo(this.seconds);
  }
  get secondsDigitOne(): number {
    return this.digitOne(this.seconds);
  }

  get cSeconds(): number {
    return Math.floor((this.time / 10) % 100);
  }

  get cSecondsDigitTwo(): number {
    return this.digitTwo(this.cSeconds);
  }
  get cSecondsDigitOne(): number {
    return this.digitOne(this.cSeconds);
  }


  private digitTwo(val: number) {
    return Math.floor((val / 10) % 10);
  }
  private digitOne(val: number) {
    return val % 10;
  }

}

import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnDestroy{
  _time?: Date;
  @Input() set time(val: Date | undefined) {
    this._time = val;

    this.setTime();
  }
  get time() {
    return this._time;
  }
  
  @Input() dayText ?: string = "Day";
  @Input() hourText ?: string = "Hour";
  @Input() minuteText ?: string = "Minute";
  @Input() secondText ?: string = "Second";

  @Output() onReached = new EventEmitter();


  day: number = 0;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;

  timerID: any = null;

  ngOnDestroy(): void {
    this.removeTime();
  }

  /**
   * Set Time
   * @createdby e12e 15.12.2023
   */
  setTime() {
    if (!this._time) {
      this.removeTime();
      return;
    }

    const date = new Date(this._time);
    const dateMinute = date.getMinutes();
    const dateHour = date.getHours();
    const currentDate = new Date();
    const currentSecond = currentDate.getSeconds();
    const currentMinute = currentDate.getMinutes();
    const currentHour = currentDate.getHours();
    const currentMilliseconds = currentDate.getMilliseconds();

    // Reset second, millisecond
    date.setSeconds(0);
    date.setMilliseconds(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    // The check must be greater than the current date
    if (date <= currentDate) {
      this.removeTime();
      return;
    }

    // Set Second
    this.second = 60 - currentSecond;

    // Set Minute
    // If the set minute is greater than the current minute
    if (dateMinute >= currentMinute)
      this.minute = dateMinute - currentMinute;
    // If the set minute is less than the current minute
    else
      this.minute = 60 - currentMinute + dateMinute;

    // Minus 1 minute
    if (this.minute > 0) this.minute--;
    else this.minute = 59;

    // Set Hour
    // If the set time is greater than the current time
    if (dateHour >= currentHour)
      this.hour = dateHour - currentHour;
    // If the set time is less than the current time
    else
      this.hour = 24 - currentHour + dateHour;

    // If the set minute is less than the current minute, subtract 1 hour
    if (dateMinute <= currentMinute) {
      if (this.hour > 0) this.hour--;
      else this.hour = 23;
    }

    // Set Day
    const timeDifference = date.getTime() - currentDate.getTime();
    this.day = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // If the time and date are the same, subtract 1 day
    if (timeDifference % (1000 * 60 * 60 * 24) == 0) this.day--;

    // Handle time run
    clearInterval(this.timerID);
    setTimeout(() => {
      this.timeRun();
      this.timerID = setInterval(() => {
        this.timeRun();
      }, 1000)
    }, 1000 - currentMilliseconds)
  }

  /**
   * Handle time run
   * @createdby e12e 15.12.2023
   */
  timeRun() {
    // If seconds are greater than 0, then reduce seconds by 1
    if (this.second > 0) {
      this.second--;
      return;
    }
    // Check that the second is 0 and the day, hour, and minute are also 0, then the date is reached
    if (!this.day && !this.hour && !this.minute) {
      clearInterval(this.timerID);
      this.onReached.emit();
      return;
    }

    // The second is less than 0, converting the second to 59
    this.second = 59;
    // If minute is greater than 0, reduce minute by 1
    if (this.minute > 0) {
      this.minute--;
      return;
    }
    // The minute is less than 0, converting the minute to 59
    this.minute = 59;
    // Hour is greater than 0, then decrease hour by 1
    if (this.hour > 0) {
      this.hour--;
      return;
    }
    // The hour is less than 0, changing the time to 23
    this.hour = 23;
    // If day is greater than 0, decrease day by 1
    if (this.day > 0) {
      this.day--;
      return;
    }
  }

  /**
   * Remove time
   * @createdby e12e 15.12.2023
   */
  removeTime() {
    this.day = 0;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    clearInterval(this.timerID);
  }
}

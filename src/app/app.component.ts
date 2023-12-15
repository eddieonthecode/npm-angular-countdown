import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  time ?: Date;

  ngOnInit(): void {
    // Default next year
    let newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() + 1);
    this.time = newDate;
  }

  /**
   * Handle reached
   * @createdby e12e 15.12.2023
   */
  handleReached() {
    alert("Date reached !!!");
  }
}

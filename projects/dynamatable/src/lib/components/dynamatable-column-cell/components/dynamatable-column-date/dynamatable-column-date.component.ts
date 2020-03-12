import { Component, OnInit } from '@angular/core';
import { DynamatableColumnComponent } from '../dynamatable-column/dynamatable-column.component';
import { DynamatableColumnResponse } from 'projects/dynamatable/src/lib/models/dynamatable-column-response';
import * as moment from 'moment';

@Component({
  selector: 'rc-dynamatable-column-date',
  templateUrl: './dynamatable-column-date.component.html',
  styleUrls: ['./dynamatable-column-date.component.scss']
})
export class DynamatableColumnDateComponent extends DynamatableColumnComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnChanges() {
    if (this.value) {
      this.value = new Date(this.value);
    }
  }

  protected get response(): DynamatableColumnResponse {

    const parsedDate = this.value.valueOf();

    const result: DynamatableColumnResponse = {
      previousValue: this.previousValue,
      value: parsedDate,
      entity: this.entity,
      property: this.property,
      rowIndex: this.rowIndex
    };

    return result;
  }

  onDateTimeChange($event) {

    let date = $event;

    if (!moment.isMoment(date)) {
      date = moment($event);
    }

    if (date.isValid()) {
      this.update.emit(this.response);
    } else {
      // revert to previous date if current value in input is invalid
      this.value = new Date(this.previousValue);
    }
  }

}

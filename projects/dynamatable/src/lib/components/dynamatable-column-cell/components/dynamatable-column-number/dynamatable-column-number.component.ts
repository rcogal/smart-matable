import { Component, OnInit } from '@angular/core';
import { DynamatableColumnComponent } from '../dynamatable-column/dynamatable-column.component';
import { DynamatableColumnResponse } from 'projects/dynamatable/src/lib/models/dynamatable-column-response';

@Component({
  selector: 'rc-dynamatable-column-number',
  templateUrl: './dynamatable-column-number.component.html',
  styleUrls: ['./dynamatable-column-number.component.scss']
})
export class DynamatableColumnNumberComponent extends DynamatableColumnComponent implements OnInit {

  constructor() {
    super();
  }

  protected get response(): DynamatableColumnResponse {
    return  {
      previousValue: this.previousValue,
      value: this.value,
      entity: this.entity,
      property: this.property,
      rowIndex: this.rowIndex
    } as DynamatableColumnResponse;
  }

  onEnter() {
    this.update.emit( this.response );
  }

}

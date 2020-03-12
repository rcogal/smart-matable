import { Component, OnInit } from '@angular/core';
import { DynamatableColumnComponent } from '../dynamatable-column/dynamatable-column.component';
import { DynamatableColumnResponse } from 'projects/dynamatable/src/lib/models/dynamatable-column-response';
import { SelectConfig } from 'projects/dynamatable/src/lib/models/dynamatable-column';

@Component({
  selector: 'rc-dynamatable-column-select',
  templateUrl: './dynamatable-column-select.component.html',
  styleUrls: ['./dynamatable-column-select.component.scss']
})
export class DynamatableColumnSelectComponent extends DynamatableColumnComponent implements OnInit {

  ngOnInit() {
  }

  get config(): SelectConfig {
    return this.column.config || [];
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

  select($event: string) {
    this.value = $event;

    this.update.emit( this.response );
  }

  get selectedValue() {
    if (this.value) {
      return this.value;
    }

    return -1;
  }

}

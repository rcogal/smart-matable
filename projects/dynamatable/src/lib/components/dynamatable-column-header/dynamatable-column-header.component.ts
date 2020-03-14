import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DynamatableColumn } from '../../models/dynamatable-column';

@Component({
  selector: 'rc-dynamatable-column-header',
  templateUrl: './dynamatable-column-header.component.html',
  styleUrls: ['./dynamatable-column-header.component.scss']
})
export class DynamatableColumnHeaderComponent {

  /**
   * Contains the current column setup
   *
   */
  @Input() column: DynamatableColumn;

  /**
   * Current binding value of header
   *
   */
  @Input() value: string;

  /**
   * Event
   *  Emits on enter key event
   */
  @Output() update = new EventEmitter();

  onUpdateInput() {
    this.update.emit({
      columnIndex: this.column.index,
      value: this.value
    });
  }
}

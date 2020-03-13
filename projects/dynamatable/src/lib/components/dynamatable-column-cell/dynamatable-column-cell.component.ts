import { Component, OnInit, Input } from '@angular/core';
import { DynamatableColumnComponent } from './components/dynamatable-column/dynamatable-column.component';
import { DynamatableColumnType } from '../../models/dynamatable-column-type.enum';
import { DynamatableColumnResponse } from '../../models/dynamatable-column-response';

@Component({
  selector: 'rc-dynamatable-column-cell',
  templateUrl: './dynamatable-column-cell.component.html',
  styleUrls: ['./dynamatable-column-cell.component.scss']
})
export class DynamatableColumnCellComponent extends DynamatableColumnComponent {

  /**
   * Determines the type of the column
   *
   */
  @Input()
  public type: DynamatableColumnType;

  /**
   * Reference to the list of column types available
   *
   */
  public ColumnType = DynamatableColumnType;

  /**
   * Standard response of column component cell
   *
   */
  // tslint:disable-next-line:variable-name
  private _response: DynamatableColumnResponse;

  constructor() {
    super();
  }

  /**
   * Triggers the update event when child component<T> emits the update
   *
   */
  onUpdateColumnCell($event: DynamatableColumnResponse) {
    this._response = $event;

    this.update.emit( this.response );
  }

  get response() {
    return this._response;
  }

}

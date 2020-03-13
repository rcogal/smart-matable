import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { DynamatableColumn } from '../../models/dynamatable-column';
import { DynamatableColumnType } from '../../models/dynamatable-column-type.enum';

@Component({
  selector: 'rc-dynamatable-column-menu',
  templateUrl: './dynamatable-column-menu.component.html',
  styleUrls: ['./dynamatable-column-menu.component.scss']
})
export class DynamatableColumnMenuComponent implements OnInit, OnChanges {

  /**
   * Additional columns that allow users to hide/show columns
   *
   */
  @Input()
  public columns: DynamatableColumn[] = [];

  /**
   * Triggers when adding new column on smart table
   */
  @Output()
  public addedColumn = new EventEmitter();


  @Output()
  public selectionColumn = new EventEmitter();

  // Columnt types: use in template file
  public readonly Column: any = DynamatableColumnType;

  public systemDefaultColumn: DynamatableColumn[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.setSystemDefaultColumn();
  }

  addColumn(columnType: DynamatableColumnType) {
    this.addedColumn.emit(columnType as string);
  }

  setSystemDefaultColumn() {

    this.systemDefaultColumn = [];

    this.columns.forEach( column => {
      if (column.systemDefault) {
        this.systemDefaultColumn.push(column);
      }
    });
  }

  onSelectionColumn($event) {
    const column = $event.option.value as DynamatableColumn;

    column.config.hidden = column.config.hidden ? false : true;

    this.selectionColumn.emit( column );
  }

}

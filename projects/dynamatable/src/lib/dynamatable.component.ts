import { Component, OnInit, Input, Output, EventEmitter, ViewChild, QueryList, ContentChildren, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DynamatableColumn, ColumnConfig } from './models/dynamatable-column';
import { SelectionModel } from '@angular/cdk/collections';

import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatCheckbox } from '@angular/material/checkbox';
import { DynamatableColumnDirective } from './directives/dynamatable-column/dynamatable-column.directive';
import { DynamatableConfigurationService } from './services/dynamatable-configuration.service';
import { DynamatableColumnConfiguration } from './models/dynamatable-column-configuration';
import { debounceTime } from 'rxjs/operators';
import { DynamatableColumnHeaderCache } from './models/dynamatable-column-header-cache';
import { DynamatableColumnType } from './models/dynamatable-column-type.enum';
import { DynamatableColumnResponse } from './models/dynamatable-column-response';
import { CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DynamatableColumnMode } from './models/dynamatable-column-mode.enum';

@Component({
  selector: 'rc-dynamatable',
  templateUrl: './dynamatable.component.html',
  styleUrls: ['./dynamatable.component.scss']
})
export class DynamatableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  /**
   * DISABLE edit on the table in general
   *
   */
  @Input()
  public readonly: boolean = false;

  /**
   * Reference ID for specific object. this is used as a reference if row is from db or dummy
   *
   */
  @Input()
  public refId: any;

  /**
   * Source data to display
   *
   */
  @Input()
  public dataSource: any = new MatTableDataSource<any>([]);

  /**
   * Event:
   *  triggers when column is removed
   */
  @Output()
  public removeColumn = new EventEmitter();

  /**
   * Event:
   *  triggers when item row is removed
   *
   */
  @Output()
  public removeRow = new EventEmitter();

  /**
   * Event:
   *  triggers when adding a new column
   */
  @Output()
  public addColumn = new EventEmitter();

  /**
   * Event:
   *  triggers after updating the cell
   */
  @Output()
  public updateColumn = new EventEmitter();

  /**
   * Event:
   *  triggers after updating the header
   */
  @Output()
  public updateHeader = new EventEmitter();

  /**
   * Event:
   *  emits the event when header dropped
   *
   */
  @Output()
  public draggedHeader = new EventEmitter();

  /**
   * Event:
   *  emits when selecting data row
   *
   */
  @Output()
  public selectionItem = new EventEmitter();

  /**
   * System default menu event emitter
   *
   */
  @Output()
  public selectionSystemMenu = new EventEmitter();


  @Output()
  public sortHeader = new EventEmitter();

  // Holds the list of smart table column header
  public columns: DynamatableColumn[] = [];

  // data source selection model
  public selection = new SelectionModel<any>(true, []);

  // Displayed columns linked to datasource
  public displayedColumns = [];

  // for drag and drop column header
  private previousIndex: number;

  // Only disable the header action when edit mode on header is active
  public forceDisabledHeaderAction: boolean = false;

  @ViewChild(MatSort, { static: true })
  public sort: MatSort;

  @ViewChild('checkboxAll', { static: true })
  public checkboxAll: MatCheckbox;

  /**
   * Smart table column reference
   */
  @ContentChildren(DynamatableColumnDirective)
  private dynacolumns: QueryList<DynamatableColumnDirective>;

  constructor(private configSetting: DynamatableConfigurationService) { }

  /**
   * Global configuration for smart table
   * that can also be utilized inside theh smart table columns
   */
  @Input()
  public set settings(value: DynamatableColumnConfiguration) {
    this.configSetting.setConfig(value);
  }

  ngOnInit() {
    this.selection
    .changed.pipe( debounceTime(300) )
      .subscribe( () => {
        this.selectionItem.emit( this.selection );
      });
  }

  sortData($event) {
    this.sortHeader.emit( $event );
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.initializeColumns();
    });

    this.dynacolumns.changes.subscribe( () => {
      this.initializeColumns();
    });

  }


  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource<any>(this.dataSource);
  }

  ngOnDestroy() {
    this.selection.changed.unsubscribe();
  }

  /**
   * This generates the column for smart table
   *
   */
  private initializeColumns(): void {
    this.columns = this.dynacolumns.toArray();

    this.selection.clear();

    this.refreshColumns();
  }

  /**
   * Emits the event that add row has been clicked
   *
   */
  onCreateColumn(columnType: DynamatableColumnType) {

    const uniqueid = Date.now().toString(36) + Math.random().toString(36).substr(2);

    const config: ColumnConfig = {
      hidden: false,
      hideable: false
    };

    const column: DynamatableColumn = {
      type: columnType,
      name: uniqueid,
      display: columnType.toUpperCase(),
      custom: true,
      config
    };

    // add new coumns
    this.columns.push( column );

    this.refreshColumns();

    this.addColumn.emit(column);
  }

  /**
   * Emits the updateCell event
   *
   */
  onUpdateColumn(responseData: DynamatableColumnResponse) {
    try {
      // update the value of the specific column
      responseData.entity[ responseData.property ] = responseData.value;

      this.updateColumn.emit(responseData);
    } catch (ex) {
      console.error( 'Something went wrong updating the column value', ex );
    }
  }

  /**
   * Emits the updateHeader event
   *
   */
  onUpdateHeader(data: { columnIndex: number, value: string }) {
    if (data && data.columnIndex > -1) {
      this.columns[data.columnIndex].display = data.value;
      this.forceDisabledHeaderAction = false;

      this.updateHeader.emit(data);
    }
  }

  /**
   * Set displayed colukmns dynamic based on {DynamatableColumn} dyna columns
   *
   */
  refreshColumns() {
    // checkbox column
    this.displayedColumns = [];

    let sortIndex = 0;

    if (!this.readonly) {
      this.displayedColumns.push('select');
      sortIndex = 1;
    }

    this.columns.forEach(( column, index) => {

      column.index = index;

      if (!column.config.hidden) {
        this.displayedColumns[sortIndex] = column.name;

        sortIndex++;
      }

    });

    if (!this.readonly) {
      // add column
      this.displayedColumns.push('action');
    }
  }

  /**
   * Sets the index of specific column
   *
   */
  dragStarted(event: CdkDragStart, index: number ) {
    this.previousIndex = index;
  }

  /**
   * Triggers the event when column is dropped
   *
   */
  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.columns, this.previousIndex, index);

      this.refreshColumns();

      this.draggedHeader.emit( this.columns );
    }
  }

  /**
   * Update the displaye columns when adding new column
   *
   */
  onSelectionColumn(column: DynamatableColumn) {
    this.selectionSystemMenu.emit(column);
    // set the display columns
    this.refreshColumns();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   * selection on checkbox
   */
  onSelectionItem(row: DynamatableColumn) {
    this.selection.toggle(row);
  }

  /**
   * Event
   *  delete column header
   *
   */
  removeHeader(columnIndex: number, column: DynamatableColumn) {

    if (columnIndex > -1) {
      this.columns.splice(columnIndex, 1);
      this.refreshColumns();
    }

    this.removeColumn.emit({
      columnIndex,
      column,
      columns: this.columns
    });
  }

  /**
   * Determine the mode of the editable if edit or view
   */
  getMode(row: any, column: DynamatableColumn) {

    const editable = column.config.editable;

    if (editable === false || editable === undefined) {
      return DynamatableColumnMode.VIEW;
    } else {
      return DynamatableColumnMode.EDIT;
    }
  }

  /**
   * Delete record
   *
   */
  deleteRow(entity: any, index: number) {
    if (index > -1) {
      this.dataSource.data.splice(index, 1);

      this.dataSource._updateChangeSubscription();
    }

    this.removeRow.emit(entity);
  }

  /**
   * Check if header is sortable
   *
   */
  isHeaderSortDisabled(column: DynamatableColumn): boolean {
    return column.config && !(column.config.sortable === undefined || column.config.sortable === true);
  }

  /**
   * Disable current sorting state when  editing the header
   *
   */
  onEditHeader($event) {
    this.forceDisabledHeaderAction = true;
  }

  isHeaderEditable(config) {

    if (this.readonly === true) {
      return false;
    }

    return config && config.editableHeaderText;
  }

}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, QueryList, ContentChildren, AfterViewInit, OnDestroy, OnChanges, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DynamatableColumn, ColumnConfig } from './models/dynamatable-column';
import { SelectionModel } from '@angular/cdk/collections';
import { DynamatableColumnEditModeComponent } from './components/dynamatable-column-edit-mode/dynamatable-column-edit-mode.component';
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
  styleUrls: ['./dynamatable.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DynamatableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  /**
   * DISABLE edit on the table in general
   *
   * @type {boolean}
   */
  @Input()
  public readonly: boolean = false;

  /**
   * Reference ID for specific object. this is used as a reference if row is from db or dummy
   *
   * @type {*}
   */
  @Input()
  public refId: any;

  /**
   * Source data to display
   *
   * @type {*}
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

  @Output()
  public viewRow = new EventEmitter();

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

  // cache column header to determine the type and display text
  // tslint:disable-next-line:variable-name
  private _cacheColumnHeader: any = {};

  // Displayed columns linked to datasource
  public displayedColumns = [];

  // for drag and drop column header
  private previousIndex: number;

  // Only disable the header action when edit mode on header is active
  public forceDisabledHeaderAction: boolean = false;

  private editableInput: DynamatableColumnEditModeComponent;

  private editableInput$: Subject<DynamatableColumnEditModeComponent> = new Subject();

  @ViewChild(MatSort, { static: true}) public sort: MatSort;

  @ViewChild('checkboxAll', { static: true }) public checkboxAll: MatCheckbox;

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

    this.editableInput$.subscribe( editable => {
      // tslint:disable-next-line:no-unused-expression
      (editable && editable.toViewMode());
      // clear the editable component reference
      this.editableInput = null;
    }) ;
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

    this.setDisplayedColumns();
  }

  /**
   * Returns the cache column header
   *
   * @readonly
   */
  public get cacheColumnHeader(): DynamatableColumnHeaderCache {
    return this._cacheColumnHeader;
  }

  /**
   * Emits the event that add row has been clicked
   *
   */
  onCreateColumn(columnType: DynamatableColumnType) {

    const uniqueid = Date.now().toString(36) + Math.random().toString(36).substr(2);

    const config: ColumnConfig = {
      hidden: false,
      editable: true,
      hideable: false
    };

    const column: DynamatableColumn = {
      type: columnType,
      name: uniqueid,
      display: columnType.toUpperCase(),
      custom: true,
      config
    };

    this.addColumn.emit(column);
  }

  /**
   * Get the column type
   *
   * @param {string} column
   */
  getColumnType(column: string): string {
    return this.cacheColumnHeader[column].type;
  }

  /**
   * Returns the display text of column header
   *
   * @param {string} column
   */
  getColumnHeader(column: string): string {
    if (this.cacheColumnHeader[column]) {
      return this.cacheColumnHeader[column].text;
    }

    return;
  }

  /**
   * Emits the updateCell event
   *
   * @param {*} [data={}]
   */
  onUpdateColumn(responseData: DynamatableColumnResponse) {
    try {
      // update the value of the specific column
      responseData.entity[ responseData.property ] = responseData.value;

      this.editableInput$.next( this.editableInput );

      this.updateColumn.emit(responseData);
    } catch (ex) {
      console.error( 'Something went wrong updating the column value', ex );
    }
  }

  /**
   * Emits the updateHeader event
   *
   * @param {*} [data={}]
   */
  onUpdateHeader(data: any = {}) {

    this.forceDisabledHeaderAction = false;
    this.updateHeader.emit(data);
  }

  /**
   * Set displayed colukmns dynamic based on {DynamatableColumn} dyna columns
   *
   */
  setDisplayedColumns() {

    // checkbox column
    this.displayedColumns = [];


    let sortIndex = 0;

    if (!this.readonly) {
      this.displayedColumns.push('select');
      sortIndex = 1;
    }

    this.columns.forEach(( column, index) => {

      this._cacheColumnHeader[column.name] = {
        type: column.type,
        text: column.display
      };

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
   * @param {CdkDragStart} event
   * @param {number} index
   */
  dragStarted(event: CdkDragStart, index: number ) {
    this.previousIndex = index;
  }

  /**
   * Triggers the event when column is dropped
   *
   * @param {CdkDropList} event
   * @param {number} index
   */
  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.columns, this.previousIndex, index);

      this.setDisplayedColumns();

      this.draggedHeader.emit( this.columns );
    }
  }

  /**
   * Update the displaye columns when adding new column
   *
   * @param {DynamatableColumn} column
   */
  onSelectionColumn(column: DynamatableColumn) {
    this.selectionSystemMenu.emit(column);
    // set the display columns
    this.setDisplayedColumns();
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
   *
   * @param {DynamatableColumn} row
   */
  onSelectionItem(row: DynamatableColumn) {
    this.selection.toggle(row);
  }

  /**
   * Event
   *  delete column header
   *
   * @param {number} columnIndex
   * @param {DynamatableColumn} column
   */
  removeHeader(columnIndex: number, column: DynamatableColumn) {
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

    if (editable === true && !row[ this.refId ]) {
      return DynamatableColumnMode.EDIT;
    } else {
      return DynamatableColumnMode.VIEW;
    }
  }

  /**
   * Reference to the current active editable input
   */
  onEditMode($event: DynamatableColumnEditModeComponent) {
    this.editableInput = $event;
  }

  /**
   * Delete record
   *
   * @param {*} entity
   * @param {number} index
   */
  deleteRow(entity: any, index: number) {

    if (!entity[ this.refId ]) {
      this.dataSource.data.splice(index, 1);

      this.dataSource._updateChangeSubscription();
    }

    this.removeRow.emit(entity);

  }

  /**
   * Check if header is sortable
   *
   * @param {DynamatableColumn} column
   * @returns {boolean}
   */
  isHeaderSortDisabled(column: DynamatableColumn): boolean {
    return column.config && !(column.config.sortable === undefined || column.config.sortable === true);
  }

  /**
   * Disable current sorting state when  editing the header
   *
   * @param {*} $event
   */
  onEditHeader($event) {
    console.log($event);
    this.forceDisabledHeaderAction = true;
  }

  view(entity: any) {
    this.viewRow.emit(entity);
  }

  isHeaderEditable(config) {

    if (this.readonly === true) {
      return false;
    }

    return config && config.editableHeaderText;
  }

}

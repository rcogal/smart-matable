import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DynamatableColumn } from 'projects/dynamatable/src/lib/models/dynamatable-column';
import { DynamatableColumnResponse } from 'projects/dynamatable/src/lib/models/dynamatable-column-response';
import { DynamatableColumnInput } from 'projects/dynamatable/src/lib/models/dynamatable-column-input';

export abstract class DynamatableColumnComponent implements DynamatableColumnInput, OnInit {

  /**
   * Column configuration object of specific type
   *
   */
  @Input()
  public column: DynamatableColumn;

  /**
   * Object property that's currently updated
   *
   * @type {string}
   */
  @Input()
  public property: string;

  /**
   * Current input value of object property
   *
   * @type {*}
   */
  @Input()
  public value: any;

  /**
   * Current index of the selected row
   *
   * @type {number}
   */
  @Input()
  public rowIndex: number;


  /**
   * Reference of the selected object
   *
   * @type {*}
   */
  @Input()
  public entity: any;

  /**
   * Event:
   *  emits the update event after update action of specific column cell <Component>
   *
   */
  @Output()
  public update = new EventEmitter();

  /**
   * Create a copy of current entity;
   *
   * @protected
   * @type {*}
   */
  protected copyEntity: any;

  /**
   * Holds the previous value of the column
   *
   * @type {*}
   */
  previousValue: any;


  constructor() {

  }

  ngOnInit() {
    this.copyEntity = Object.assign({}, this.entity);

    if (this.property) {
      this.previousValue = this.copyEntity[ this.property ];
    }
  }

  /**
   * Standard response for column component
   *
   * @readonly
   * @abstract
   */
  protected abstract get response(): DynamatableColumnResponse;

  /**
   * Get the column config of smart table
   *
   * @protected
   * @template T
   * @returns {T}
   */
  protected getConfig<T>(): T {
    return this.column && this.column.config;
  }

}

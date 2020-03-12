import { Directive, Input, AfterViewInit, OnChanges } from '@angular/core';
import { DynamatableColumnType } from '../../models/dynamatable-column-type.enum';

@Directive({
  selector: 'rc-dynamatable-column'
})
export class DynamatableColumnDirective implements OnChanges {

  /**
   * Smart table colum name maps to db field
   */
  @Input()
  public name: string;

  /**
   * Smart table display header text
   */
  @Input()
  public display: string;

  /**
   * Smart table column type
   *
   */
  @Input()
  public type: DynamatableColumnType;

  /**
   * Smart table property for sort order
   *
   */
  // tslint:disable-next-line:no-input-rename
  @Input('sort')
  public index: number;


  /**
   * Smart table property if column is custom
   *
   */
  @Input()
  public custom: boolean = false;

  /**
   * Smart table config if column appear in system default section
   *
   */
  @Input()
  public systemDefault: boolean = false;


  /**
   * Configuration object for specific column type
   *
   */
  @Input()
  public config: any;

  ngOnChanges() {
    if (!this.config) {
      this.config = {};
    }
  }

}

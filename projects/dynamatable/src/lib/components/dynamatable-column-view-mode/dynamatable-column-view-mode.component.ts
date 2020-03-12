import { Component, OnInit, Input } from '@angular/core';
import { DynamatableConfigurationService } from '../../services/dynamatable-configuration.service';
import { DynamatableColumnType } from '../../models/dynamatable-column-type.enum';
import { DynamatableColumn } from '../../models/dynamatable-column';
import * as moment from 'moment';

@Component({
  selector: 'rc-dynamatable-column-view-mode',
  templateUrl: './dynamatable-column-view-mode.component.html',
  styleUrls: ['./dynamatable-column-view-mode.component.css']
})
export class DynamatableColumnViewModeComponent implements OnInit {

  /**
   * Current column setup
   *
   */
  @Input()
  public column: DynamatableColumn;

  /**
   * Raw data of column
   *
   */
  @Input()
  public entity: any = {};

  /**
   * Determine the current type of view. Can be used to format the data
   *
   */
  @Input()
  public type: DynamatableColumnType;

  /**
   * Reference to the list of column types available
   *
   */
  public Column = DynamatableColumnType;

  constructor(private setting: DynamatableConfigurationService) { }

  ngOnInit() {
  }

  get readonly() {
    return this.column.config.editable === false;
  }

  get property() {
    return this.column.name;
  }

  public get value() {
    const value = this.entity[ this.property ];

    switch (this.type) {
      case DynamatableColumnType.DATE:
        return value && moment( value ).format( this.setting.config.dateFormat || 'MM/DD/YYYY');
      default:
        return this.entity[ this.property ];
    }
  }

}

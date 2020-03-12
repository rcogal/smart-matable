import { DynamatableColumnType } from './dynamatable-column-type.enum';

export interface ColumnConfig {
  hideable?: boolean;
  hidden?: boolean;
  editable?: boolean;
  editableHeaderText?: boolean;
  sortable?: boolean;
}

export interface SelectConfig extends ColumnConfig {
  displayValue: string;
  displayField: string;
  values: any[];
}

export interface TextAutocomplete {
  values: any[];
  displayField: string;
  displayValue: string;
  // navigates the value of the object to specific property
  navigation: string;
}

export interface InputTextConfig extends ColumnConfig {
  autocomplete?: TextAutocomplete;
}

export interface InputNumberConfig extends ColumnConfig {
}

interface InputDateConfig extends ColumnConfig {
}


export interface DynamatableColumn {
  name: string;
  display: string;
  sort?: number; // not use as of the moment
  type: DynamatableColumnType;
  index?: number;
  custom?: boolean;
  config?: any;
  systemDefault?: boolean;
}

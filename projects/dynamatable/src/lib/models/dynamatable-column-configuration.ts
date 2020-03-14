/**
 * Column config should correspond to column types
 */
interface DynamatableColumnConfig {
  date?: any;
  select?: any;
  number?: any;
  tex?: any;
}

export interface DynamatableColumnConfiguration {
  // Date format for column date
  dateFormat?: string;

  columns?: DynamatableColumnConfig;
}

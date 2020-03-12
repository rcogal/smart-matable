import { NgModule } from '@angular/core';
import { DynamatableComponent } from './dynamatable.component';

import { DynamatableColumnEditModeDirective } from './directives/dynamatable-column-edit-mode/dynamatable-column-edit-mode.directive';
import { DynamatableColumnViewModeDirective } from './directives/dynamatable-column-view-mode/dynamatable-column-view-mode.directive';
import { EditableOnEnterDirective } from './directives/dynamatable-column-action/editable-on-enter/editable-on-enter.directive';
import { DynamatableColumnDirective } from './directives/dynamatable-column/dynamatable-column.directive';
import { DynamatableColumnCellComponent } from './components/dynamatable-column-cell/dynamatable-column-cell.component';
import { DynamatableColumnMenuComponent } from './components/dynamatable-column-menu/dynamatable-column-menu.component';
import { DynamatableColumnHeaderComponent } from './components/dynamatable-column-header/dynamatable-column-header.component';
import { DynamatableColumnViewModeComponent } from './components/dynamatable-column-view-mode/dynamatable-column-view-mode.component';
import { DynamatableColumnEditModeComponent } from './components/dynamatable-column-edit-mode/dynamatable-column-edit-mode.component';

// tslint:disable-next-line:max-line-length
import { DynamatableColumnDateComponent } from './components/dynamatable-column-cell/components/dynamatable-column-date/dynamatable-column-date.component';
// tslint:disable-next-line:max-line-length
import { DynamatableColumnNumberComponent } from './components/dynamatable-column-cell/components/dynamatable-column-number/dynamatable-column-number.component';
// tslint:disable-next-line:max-line-length
import { DynamatableColumnSelectComponent } from './components/dynamatable-column-cell/components/dynamatable-column-select/dynamatable-column-select.component';
// tslint:disable-next-line:max-line-length
import { DynamatableColumnTextComponent } from './components/dynamatable-column-cell/components/dynamatable-column-text/dynamatable-column-text.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';

const MY_MOMENT_FORMATS = {
  parseInput: 'MM/DD/YYYY HH:mm',
  fullPickerInput: 'MM/DD/YYYY HH:mm',
  datePickerInput: 'MM/DD/YYYY HH:mm',
  timePickerInput: 'LT',
  monthYearLabel: 'MMMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

const MATERIAL_MODULES = [
  MatTableModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatDatepickerModule,
  DragDropModule,
  MatDividerModule,
  MatListModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSortModule,
  MatAutocompleteModule
];

@NgModule({
  declarations: [
    DynamatableComponent,
    DynamatableColumnDirective,
    DynamatableColumnEditModeDirective,
    DynamatableColumnViewModeDirective,
    EditableOnEnterDirective,
    DynamatableColumnCellComponent,
    DynamatableColumnMenuComponent,
    DynamatableColumnHeaderComponent,
    DynamatableColumnViewModeComponent,
    DynamatableColumnEditModeComponent,
    DynamatableColumnDateComponent,
    DynamatableColumnNumberComponent,
    DynamatableColumnSelectComponent,
    DynamatableColumnTextComponent
  ],
  imports: [
  ],
  exports: [DynamatableComponent]
})
export class DynamatableModule { }

import { Directive, HostListener } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { DynamatableColumnEditModeComponent } from '../../../components/dynamatable-column-edit-mode/dynamatable-column-edit-mode.component';

@Directive({
  selector: '[rcEditableOnEnter]'
})
export class EditableOnEnterDirective {

  constructor(private editable: DynamatableColumnEditModeComponent) { }

  @HostListener('keyup.enter')
  public onEnter() {
    this.editable.toViewMode();
  }

}

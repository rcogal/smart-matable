import { Directive, HostListener, EventEmitter, Output } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { DynamatableColumnEditModeComponent } from '../../../components/dynamatable-column-edit-mode/dynamatable-column-edit-mode.component';

@Directive({
  selector: '[rcEditableOnEnter]'
})
export class EditableOnEnterDirective {

  @Output() enter = new EventEmitter();

  constructor(private editable: DynamatableColumnEditModeComponent) {
  }

  @HostListener('keyup.enter', ['$event'])
  public onEnter(event) {
    this.enter.emit(event.target.value);

    this.editable.toViewMode();
  }

}

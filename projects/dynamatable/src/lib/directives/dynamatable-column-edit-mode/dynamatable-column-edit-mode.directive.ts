import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[rcDynamatableColumnEditMode]'
})
export class DynamatableColumnEditModeDirective {

  constructor(public tpl: TemplateRef<any>) { }

}

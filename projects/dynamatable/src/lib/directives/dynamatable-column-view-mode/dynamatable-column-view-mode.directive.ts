import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[rcDynamatableColumnViewMode]'
})
export class DynamatableColumnViewModeDirective {

  constructor(public tpl: TemplateRef<any>) { }

}

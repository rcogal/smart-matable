import { Component, OnInit, EventEmitter, Output, Input, ContentChild, ElementRef } from '@angular/core';
import { DynamatableColumnMode } from '../../models/dynamatable-column-mode.enum';
import { DynamatableColumnViewModeDirective } from '../../directives/dynamatable-column-view-mode/dynamatable-column-view-mode.directive';
import { DynamatableColumnEditModeDirective } from '../../directives/dynamatable-column-edit-mode/dynamatable-column-edit-mode.directive';
import { switchMapTo, filter, take } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Subject, fromEvent } from 'rxjs';

@Component({
  selector: 'rc-dynamatable-column-edit-mode',
  templateUrl: './dynamatable-column-edit-mode.component.html',
  styleUrls: ['./dynamatable-column-edit-mode.component.scss']
})
export class DynamatableColumnEditModeComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _mode: DynamatableColumnMode.VIEW | DynamatableColumnMode.EDIT;

  // tslint:disable-next-line:variable-name
  private _editable: boolean = true;

  /**
   * Current editable component reference
   */
  @Output()
  public editMode = new EventEmitter();

  /**
   * Current view mode component
  */
  @Output()
  public viewMode = new EventEmitter();

  /**
   * config to allow user to edit the cell
   *
   */
  @Input()
  public set editable(value: boolean) {
    if (value !== undefined) {
      this._editable = value;
    } else {
      this._editable = true;
    }
  }

  public get editable() { return this._editable; }

  @Input()
  public set mode(value: DynamatableColumnMode.VIEW | DynamatableColumnMode.EDIT) {
    if (value) {
      this._mode = value;
    } else {
      this._mode = DynamatableColumnMode.VIEW;
    }
  }

  public get mode() { return this._mode; }

  @ContentChild(DynamatableColumnViewModeDirective, { static: false })
  private viewComp: DynamatableColumnViewModeDirective;

  @ContentChild(DynamatableColumnEditModeDirective, {static: false})
  private editComp: DynamatableColumnEditModeDirective;

  public editModeSubject = new Subject();

  public editMode$ = this.editModeSubject.asObservable();

  constructor(private host: ElementRef) {
    this.mode = DynamatableColumnMode.VIEW;
  }

  get currentView() {
    if (this.mode === DynamatableColumnMode.VIEW) {
      return this.viewComp.tpl;
    } else {
      return this.editComp.tpl;
    }
  }

  ngOnInit() {
    this.setupViewMode();
  }

  private get element() {
    return this.host.nativeElement;
  }

  private setupViewMode() {
    fromEvent(this.element, 'click').pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      if (this.editable === true && this.mode !== DynamatableColumnMode.EDIT) {
        this.mode = DynamatableColumnMode.EDIT;

        // has time to check the element before removing on html content
        setTimeout(() => {
          this.editModeSubject.next(true);
          this.editMode.next(this);
        });
      }
    });
  }

  private setupEditMode() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }: any) => {
        return this.element.contains(target) === false;
      }),
      take(1)
    );


    this.editMode$.pipe(
      switchMapTo(clickOutside$),
      untilDestroyed(this)
    ).subscribe(event => {
      this.mode = DynamatableColumnMode.VIEW;
    });
  }

  toViewMode() {
    this.mode = DynamatableColumnMode.VIEW;
  }

}

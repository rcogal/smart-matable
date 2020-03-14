import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { DynamatableColumnComponent } from '../dynamatable-column/dynamatable-column.component';
import { Observable, fromEvent } from 'rxjs';
import { DynamatableColumnResponse } from 'projects/dynamatable/src/lib/models/dynamatable-column-response';
import { startWith, map } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { TextAutocomplete, InputTextConfig } from 'projects/dynamatable/src/lib/models/dynamatable-column';

@Component({
  selector: 'rc-dynamatable-column-text',
  templateUrl: './dynamatable-column-text.component.html',
  styleUrls: ['./dynamatable-column-text.component.scss']
})
export class DynamatableColumnTextComponent extends DynamatableColumnComponent implements OnInit, OnDestroy {

  @ViewChild(MatAutocompleteTrigger, { static: true})
  private autocompleteTrigger: MatAutocompleteTrigger;

  @ViewChild('inputText', { static: true })
  private element: ElementRef;

  control: FormControl;

  filteredOptions: Observable<any[]>;

  test(va) {
    console.log('va', va);
  }

  constructor() {
    super();
  }

  ngOnInit() {
    // set initial value of form control
    this.control = new FormControl(this.parsedInput);

    // set the previous value
    this.previousValue = this.currentData;

    // handle autocomplete listing
    this.initAutocomplete();

    // setup additional event
    this.setupInputEvent();
  }

  /**
   * Get the current value of input from form control
   *
   */
  get currentData() {
    return this.control.value;
  }

  get parsedInput() {
    if (this.isAutocomplete) {
      return this.navigationData;
    }

    return this.value;
  }

  /**
   * get the data of the navigation property
   *
   */
  get navigationData() {
    if (this.navigation) {
      return (this.entity[ this.navigation ] && this.entity[ this.navigation ][ this.displayValue ]) || {};
    }

    return this.entity[ this.property ][ this.displayValue ];
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option[ this.displayValue ].toLowerCase().indexOf(filterValue) === 0);
  }

  protected get response(): DynamatableColumnResponse {
    return {
      previousValue: this.previousValue,
      value: this.value,
      entity: this.entity,
      property: this.property,
      rowIndex: this.rowIndex
    };
  }

  private initAutocomplete() {
    if (this.isAutocomplete) {
      this.setAutocomplete(false);

      // search option on the autcomplete
      this.filteredOptions = this.control.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          return typeof value === 'string' ? value : value[ this.displayValue ]
        }),
        map(name => name ? this._filter(name) : this.options.slice())
      );
    } else {
      this.setAutocomplete(true);
    }
  }

  get isAutocomplete() {
    return !!this.config.autocomplete;
  }

  /**
   * handle the setting of autocomplete
   *
   */
  private setAutocomplete(enable: boolean) {
    this.autocompleteTrigger.autocompleteDisabled = enable;
  }

  onUpdateInputData() {
    let valid = true;

    // parsed the value of the current input if autocomplete enabled
    // since it's the value of autocoplete is an object
    if (this.isAutocomplete) {
      if (typeof this.currentData === 'string') {
        const found = this.options.find(
            item => item[ this.displayValue ] === this.currentData
          );

        if (!found) { valid = false; }

        this.entity[ this.navigation ] = found || {};
      } else {
        this.entity[ this.navigation ] = this.currentData;
      }
      // update the value to its current navigation
      this.value = this.entity[ this.navigation ][ this.displayValue ];
    } else {
      // update the value based on control value
      this.value = this.currentData;
    }

    if (valid) {
      this.update.emit( this.response );
    } else {
      // setting the value if to empty if it's not valid
      this.control.setValue('');
    }
  }

  private setupInputEvent() {
    if (!this.isAutocomplete) {

      const element = this.element.nativeElement;

      fromEvent(element, 'blur').pipe(
        untilDestroyed(this)
      ).subscribe(() => {
        if (this.control) {
          this.onUpdateInputData();
        }
      });
    }
  }

  ngOnChanges() {
  }

  /**
   * @config automcomplete
   */
  get autocomplete(): TextAutocomplete {
    return this.config.autocomplete;
  }

  /**
   * @config displayfield of autocomplete
   *
   */
  get displayField() {
    return this.autocomplete && this.autocomplete.displayField;
  }

  /**
   * @config display value of autocomplete
   *
   */
  get displayValue() {
    return this.autocomplete && this.autocomplete.displayValue;
  }

  /**
   * @config naivation property
   *  - used to navigate the value to specific property of the object
   *
   */
  get navigation() {
    return this.autocomplete && this.autocomplete.navigation;
  }

  /**
   * Autocomplete values
   *
   */
  get options(): any[] {
    return (this.autocomplete.values) || [];
  }

  /**
   * Column configuration
   *
   */
  get config(): InputTextConfig {
    return this.getConfig<InputTextConfig>();
  }

  /**
   * Display
   *
   */
  get displayFn() {

    const displayProperty = this.displayValue;

    return (option) => {
      if (option) {
        if (typeof option === 'string') {
          return option;
        } else if (typeof option === 'object') {
          return displayProperty && option[ displayProperty ];
        }
      }

      return null;
    };
  }

  onSelectAutocomplete($event) {
    // do nothing
  }

  /**
   * destroy resources
   */
  ngOnDestroy() {
    this.control = null;
    this.previousValue = null;
    this.filteredOptions = null;
    this.autocompleteTrigger = null;
  }

}

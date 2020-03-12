import { Injectable } from '@angular/core';
import { DynamatableColumnConfiguration } from '../models/dynamatable-column-configuration';

@Injectable({
  providedIn: 'root'
})
export class DynamatableConfigurationService {

  // tslint:disable-next-line:variable-name
  private _config: DynamatableColumnConfiguration;

  constructor() { }

  public get config(): DynamatableColumnConfiguration {
    return this._config as DynamatableColumnConfiguration;
  }

  public get columns() {
    return this.config.columns || {};
  }

  public setConfig(value: DynamatableColumnConfiguration) {
    this._config = value;
  }
}

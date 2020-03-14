Dynamatable
========================

**This package supports Angular 8**


Description
-------
Dynamatable utilizes the angular material table component with additional features. It allows the user to generate table with dynamic columns and inline editing. Dynamatable also allows you to create new column depending on the type - text, number, and date.

How to Use
-------

 1. Install with [npm](https://www.npmjs.com):`npm install dynamatable --save`
 2. Add styles.
    If you are using Angular CLI, you can add this to your styles.css: 
    ```css
    @import "~ng-pick-datetime/assets/style/picker.min.css";
    ``` 
 
 3. Creating table using dynamatable component.

	Template:
    ```html
    <rc-dynamatable
      [dataSource]="dataSource">
      <rc-dynamatable-column
        *ngFor="let column of columns"
        [name]="column.name"
        [type]="column.type"
        [display]="column.display"
        [config]="column.config">
      </rc-dynamatable-column>
    </rc-dynamatable>

    ```
    
    Component:
    ```typescript
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.scss']
    })
    export class AppComponent {

      columns = [
        {
          name: 'fullname',
          display: 'Person Name',
          type: 'text',
          config: {
            width: 300
          }
        },
        {
          name: 'city',
          display: 'Address',
          type: 'text',
          config: {
            autocomplete: {
              values: [
                { name: 'Mandaue City' },
                { name: 'Cebu City' }
              ],
              displayValue: 'name',
              displayField: 'name',
              navigation: 'cityJson'
            }
          }
        }
      ];

      dataSource: any[] = [
        {
          fullname: 'john doe'
        },
        {
          fullname: 'jane doe'
        }
      ];

    }


    ```
    
    



Dynamatable
-------
Contains the following properties and events that allows developer to consume the data of the dynamatable

Properties
-------
|Name|Type|Required|Description|
|:--- |:--- |:--- |:--- |
|readonly|boolean||Inline editing is disabled|
|dataSource|`<any>`|Yes|Item data|


Events
-------
|Name|Description|
|:--- |:--- |
|removeColumn|Removed column|
|removeRow|Removed row|
|addColumn|Added new column|
|updateColumn|Edited existing cell|
|updateHeader|Renaming the header|
|draggedHeader|When header is dragged|
|selectionItem|Store the checkboxes (selected)|
|sortHeader|After sorting the header|
|settings|Supports global setting for dynamable, but for now, it only support the date format|




Features
-------
 - Dynamic generation of columns
 - Inline editing: `text`, `number`, and `date`
 - Can add new column: `text`, `number`, and `date`
 - Column sort
 - Column order sort
 - Inline editing for header text
 - Can delete custom header
 - Can delete row


Dependencies
-------
```text
"@angular/material": "^8.2.3",
"ng-pick-datetime": "^7.0.0",
"ng-pick-datetime-moment": "^1.0.8",
"ngx-take-until-destroy": "^5.4.0"
```


Author
-------
**Romel Lauron**

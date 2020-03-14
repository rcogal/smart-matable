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

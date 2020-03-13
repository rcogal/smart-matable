import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  columns = [
    {
      name: 'remarks',
      display: 'Remarks',
      type: 'text',
      config: {}
    },
    {
      name: 'runlineName',
      display: 'Runline',
      type: 'text',
      config: {}
    }
  ];

  dataSource: any[] = [];

}

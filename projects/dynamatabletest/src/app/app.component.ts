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
      config: {
        width: 300
      }
    },
    {
      name: 'runlineName',
      display: 'Runline',
      type: 'text',
      config: {}
    }
  ];

  dataSource: any[] = [
    {
      remarks: 'test remarks',
      runlineName: 'END0123412'
    },
    {
      remarks: 'test remarks',
      runlineName: 'END0123412'
    },
    {
      remarks: 'test remarks',
      runlineName: 'END0123412'
    },
    {
      remarks: 'test remarks',
      runlineName: 'END0123412'
    }
  ];

}

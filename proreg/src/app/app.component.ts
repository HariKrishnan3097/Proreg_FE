import { Component } from '@angular/core';
import { PersonlistService } from './personlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PersonlistService],
})
export class AppComponent {
  title = 'proreg';
}

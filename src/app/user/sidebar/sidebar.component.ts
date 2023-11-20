import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
accounts = [
  {
    'title':'income',
    'amount':'50'
  },
  {
    'title':'expense',
    'amount':'50'
  },
  {
    'title':'deposit',
    'amount':'50'
  }
]
}

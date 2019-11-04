import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  public promos = [];
  constructor() { }

  ngOnInit() {
  }
  dataString(data): String {
    return moment(data).format('l')
  }
}

import { Component, OnInit } from "@angular/core";
import { ApiService } from 'src/app/services/api.service';
import { Promo } from 'src/app/model/promo';

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"]
})
export class ReportsComponent implements OnInit {
  listPromo: Promo[] = []
  displayedColumns: string[] = ["position", "name", "weight"];
  dataSource = [];
  constructor(public api: ApiService) { }

  ngOnInit() {

  }
}

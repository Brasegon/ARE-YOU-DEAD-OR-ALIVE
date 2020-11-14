import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  isPrinted = false;
  id;
  name = "iss";
  height = '30';
  velocity = '40';
  date = '2018';
  longitude = '50';
  latitude = '60';

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  print_satellite() {
      this.id = (<HTMLInputElement>document.getElementById("search")).value;
      this.isPrinted = true;
  }
}

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
    this.id = window.history.state.search;
    console.log(this.id);
    if (this.id !== undefined) {
      this.print_satellite_from_home(this.id);
    }
  }

  print_satellite_from_home(id)
  {
    this.isPrinted = true;
  }
  // tslint:disable-next-line:typedef
  print_satellite() {
      this.id = (<HTMLInputElement>document.getElementById("search")).value;
      this.isPrinted = true;
  }
}

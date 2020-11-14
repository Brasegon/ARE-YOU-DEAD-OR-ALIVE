import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { TokenService } from '../api/token.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private auth : AuthService, private token: TokenService) { }

  isPrinted = false;
  id;
  name;
  height;
  velocity;
  date;
  longitude;
  latitude;
  orbitType;
  type;
  elevation;
  azimuth;

  ngOnInit(): void {
    this.id = window.history.state.search;
    console.log(this.id);
    if (this.id !== undefined) {
      this.print_satellite_from_home(this.id);
    }
  }

  // tslint:disable-next-line:typedef
  print_satellite_from_home(id)
  {
    this.isPrinted = true;
  }
  // tslint:disable-next-line:typedef
  print_satellite() {
      this.id = (<HTMLInputElement>document.getElementById("search")).value;
      this.auth.search(this.id);
      this.isPrinted = true;

  }
}

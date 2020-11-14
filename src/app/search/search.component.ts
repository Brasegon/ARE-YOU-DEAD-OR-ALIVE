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
  markers;

  ngOnInit(): void {
    this.id = window.history.state.search;
    if (this.id !== undefined) {
      this.print_satellite_from_home(this.id);
    }
  }

  addMarkers() {
    this.markers = [{
      position: {
        lat: this.latitude,
        lng: this.longitude,
      },
      label: {
        color: 'red',
        text: this.name,
      },
      title: 'Marker title',
      options: { animation: google.maps.Animation.BOUNCE },
    }];
  }
  // tslint:disable-next-line:typedef
  async print_satellite_from_home(id)
  {
    const info = await this.auth.search(this.id).toPromise();
    this.isPrinted = true;
  }
  // tslint:disable-next-line:typedef
  print_timemout() {
    let vm = this;
    setTimeout(async function () {
      const info = await vm.auth.search(vm.id).toPromise();
      vm.isPrinted = true;
      vm.name = info.name;
      vm.height = info.info.height;
      vm.velocity = info.info.velocity;
      vm.date = info.date;
      vm.longitude = info.info.lng;
      vm.latitude = info.info.lat;
      vm.orbitType = info.orbitType;
      vm.type = info.type;
      vm.elevation = info.info.elevation;
      vm.azimuth = info.info.azimuth;
      vm.addMarkers();
      vm.print_timemout();
    }, 3000)
  }
  async print_satellite() {
      this.id = (<HTMLInputElement>document.getElementById("search")).value;
      const info = await this.auth.search(this.id).toPromise();
      this.isPrinted = true;
      this.name = info.name;
      this.height = info.info.height;
      this.velocity = info.info.velocity;
      this.date = info.date;
      this.longitude = info.info.lng;
      this.latitude = info.info.lat;
      this.orbitType = info.orbitType;
      this.type = info.type;
      this.elevation = info.info.elevation;
      this.azimuth = info.info.azimuth;
      this.addMarkers();
      this.print_timemout()
  }
}

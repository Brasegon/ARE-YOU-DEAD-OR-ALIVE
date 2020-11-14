import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

   }

  id;

  ngOnInit(): void {
  }

  search(){
  this.id = (<HTMLInputElement>document.getElementById("search")).value;
  this.router.navigate(['search'], { state: { search: this.id } });
  }

}

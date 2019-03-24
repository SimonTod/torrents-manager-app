import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../services/http.service';
import { ApplicationConfig, MY_CONFIG, MY_CONFIG_TOKEN } from '../app.config';

import { CurrentUser } from '../models/currentUser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  config: ApplicationConfig;
  currentUser: CurrentUser;
  error: string = '';

  constructor(
    @Inject(MY_CONFIG_TOKEN) configuration: ApplicationConfig,
    private router: Router, 
    private httpService: HttpService
  ) {
    this.config = configuration;
   }

  ngOnInit() {
    if (!this.httpService.hasAuthToken())
      this.router.navigate(['login']);
    else {
      this.init();
    }
  }

  init() {
    this.httpService.get(this.config.apiEndpoint + "/user")
    .then(
      (data: CurrentUser) => {
        this.currentUser = data;
      },
      error => this.error = error.message
    )
  }

}

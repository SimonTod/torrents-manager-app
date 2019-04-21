import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';

import { HttpService } from '../../services/http.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  currentUser: User;
  error: string = '';

  constructor(
    private router: Router, 
    private httpService: HttpService
  ) {}

  ngOnInit() {
    if (!HttpService.hasAuthToken())
      this.router.navigate(['login']);
    else {
      this.init();
    }
  }

  init() {
    this.httpService.get(environment.apiEndpoint + "/user")
    .then(
      (data: User) => {
        this.currentUser = data;
      },
      error => this.error = error.message
    )
  }

}

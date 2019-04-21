import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, private httpService: HttpService) {
  }

  hasAuthToken() {
    return HttpService.hasAuthToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}

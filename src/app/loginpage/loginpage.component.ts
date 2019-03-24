import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../services/http.service';
import { ApplicationConfig, MY_CONFIG, MY_CONFIG_TOKEN } from '../app.config';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  config: ApplicationConfig;
  loginForm: FormGroup;
  error: string = '';

  constructor(
    @Inject(MY_CONFIG_TOKEN) configuration: ApplicationConfig,
    private formBuilder: FormBuilder,
    private router: Router,
    public httpService: HttpService
  ) { 
    this.config = configuration;
    this.loginForm = formBuilder.group({
      'username': ['', [
        Validators.required, 
        //email regex
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
      ]],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.httpService.hasAuthToken())
      this.router.navigate(['']);
  }

  onSubmit() {
    this.error = '';
    this.httpService.post(
      this.config.apiEndpoint + "/login_check", 
      { username: this.loginForm.value.username, password: this.loginForm.value.password }
    ).then(
      (data: any) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refresh_token', data.refresh_token)
        this.router.navigate(['']);
      },
      error => this.error = error.error.message
    );
  }
}

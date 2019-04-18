import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    public http: HttpClient
  ) {}

  post(url: string, body: any): Promise<any> {
    let headerDict = {}
    headerDict["Content-Type"] = 'application/json';

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    console.log("Call post " + url);
    return this.http.post(url, body, requestOptions)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  get(url: string, body: any = null): Promise<any> {
    var urlGet = url + this.BuildURLParametersString(body);
    console.log("Call get " + urlGet);
    return this.http.get(urlGet)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private BuildURLParametersString(parameters: any): string {
    if (!parameters || parameters == null || Object.keys(parameters).length === 0)
      return "";

    var string = "?";

    var separator = "";
    Object.keys(parameters).forEach(key => {
      string += separator + decodeURI(key) + "=" + encodeURI(parameters[key]);
      separator = "&";
    });

    return string;
  }

  private extractData(res: Response) {
    return res || {};
  }

  private handleError(res: Response | any) {
    console.error('Entering HttpService handleError');
    console.dir(res);
    return Promise.reject(res);
  }

  public hasAuthToken() {
    return localStorage.getItem('token') !== null;
  }

  public refreshTokens(): Observable<any> {
    const body = new HttpParams().set('refresh_token', localStorage.getItem('refresh_token'));

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const refreshObservable = this.http.post(environment.apiEndpoint + "/token/refresh", body.toString(), { headers });

    const refreshSubject = new ReplaySubject<any>(1);
    refreshSubject.subscribe((r: any) => {
      localStorage.setItem('token', r.token);
      localStorage.setItem('refresh_token', r.refresh_token);
    }, (err) => {
      localStorage.clear();
      //redirect to login screen
    });

    refreshObservable.subscribe(refreshSubject);
    return refreshSubject;
  }
}

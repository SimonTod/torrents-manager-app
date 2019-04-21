import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {JwtModule, JWT_OPTIONS, JwtInterceptor} from '@auth0/angular-jwt';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {YoutubePlayerModule} from 'ngx-youtube-player';

import {Routing} from './app.routing';
import {TokenService} from './app.tokenservice';
import {RefreshTokenInterceptorService} from './services/refresh-token-interceptor.service';

import {AppComponent} from './app.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {LoginpageComponent} from './components/loginpage/loginpage.component';
import {RegisterpageComponent} from './components/registerpage/registerpage.component';
import {MediaListComponent} from './components/media-list/media-list.component';
import {MediaCreateComponent, MediaCreateDialog} from './components/media-create/media-create.component';
import {ShowMessageComponent} from './components/show-message/show-message.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatIconRegistry,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatDialogModule,
  MatCheckboxModule,
  MatCardModule,
  MatSortModule,
  MatBadgeModule
} from "@angular/material";
import { DomSanitizer } from '@angular/platform-browser';

export function jwtOptionsFactory(tokenService) {
  var whitelistedDomains = TokenService.getWhitelistedDomains();
  var blacklistedRoutes = TokenService.getBlacklistedRoutes();
  return {
    tokenGetter: () => {
      return localStorage.getItem('token');
    },
    whitelistedDomains: whitelistedDomains,
    blacklistedRoutes: blacklistedRoutes
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginpageComponent,
    RegisterpageComponent,
    MediaListComponent,
    MediaCreateComponent,
    MediaCreateDialog,
    ShowMessageComponent
  ],
  entryComponents: [MediaCreateDialog],
  imports: [
    BrowserModule,
    Routing,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService]
      }
    }),
    YoutubePlayerModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatSortModule,
    MatBadgeModule
  ],
  providers: [
    TokenService,
    JwtInterceptor, // Providing JwtInterceptor allow to inject JwtInterceptor manually into RefreshTokenInterceptor
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useExisting: JwtInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }
}

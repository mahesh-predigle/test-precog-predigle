import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DummyComponent } from './dummy/dummy.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthService, OAuthStorage, UrlHelperService } from 'angular-oauth2-oidc';
import { AuthService } from './core/auth.service';
import { authConfig } from './core/auth-config';
import { authAppInitializerFactory } from './core/auth-app-initializer.factory';
import { authModuleConfig } from './core/auth-module-config';

// We need a factory since localStorage is not available at AOT build time
export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [{ provide: APP_INITIALIZER, useFactory: authAppInitializerFactory, deps: [AuthService], multi: true },
  { provide: AuthConfig, useValue: authConfig },
  { provide: OAuthModuleConfig, useValue: authModuleConfig },
  { provide: OAuthStorage, useFactory: storageFactory },],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    private oauthService: OAuthService ,
    private urlHelper: UrlHelperService,
    private authStorage: OAuthStorage
    ){
    this.initSessionChecks();
    this.configureOAuth();
  }
    
  private initSessionChecks(): void {
    // The oidc lib does not support session checks with code flow (yet)
    // but we can work around this limitation by manually setting
    // the storage key if a session_state querystring value is available
    if (this.oauthService.sessionChecksEnabled && typeof window !== 'undefined') {
      let queryString = window.location.search;
      if (queryString.charAt(0) === '?') {
        queryString = queryString.substr(1);
      }
      const parts: any = this.urlHelper.parseQueryString(queryString);
      if (parts && parts.session_state) {
        this.authStorage.setItem('session_state', parts.session_state);
      }
    }
  }
  
private configureOAuth() {
  // this.oauthService.configure({
  //   issuer: 'https://accounts.google.com',
  //   strictDiscoveryDocumentValidation: false,// for not checking exact above url in given
  //   redirectUri: window.location.origin,// redirect after logged in to google to my application
  //   clientId:
  //     '101289191754-ue0omn4map44ra6enrtat6kui29up7kh.apps.googleusercontent.com',
  //   responseType: 'token id_token',
  //   scope: 'openid profile email',
  //   showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  //   useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
  //   silentRefreshTimeout: 5000, // For faster testing
  //   timeoutFactor: 0.25, // For faster testing
  //   sessionChecksEnabled: true,
  //   clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
  //   nonceStateSeparator : 'semicolon'
  // });
    this.oauthService.logoutUrl = "https://www.google.com/accounts/Logout";
}
}

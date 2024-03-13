import { Component } from '@angular/core';
import { OAuthService, OAuthStorage, UrlHelperService } from 'angular-oauth2-oidc';
import {AuthService} from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dummy-app';
  param1: any;
  constructor(
    private oauthService: OAuthService, 
    private authService: AuthService,
    private urlHelper: UrlHelperService,
    private authStorage: OAuthStorage
    ) {}
  
  ngOnInit(): void {
    // this.initSessionChecks();
    this.handleCallback();
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

  private handleCallback() {
    this.oauthService.tryLogin({
      onTokenReceived: (context) => {
        // Handle successful login, e.g., navigate to a protected route
        this.handleUserDetails();
      },
      onLoginError: (context) => {
        console.error('Login error:', context);
      },
    });
  }
  
  private handleUserDetails() {
    const idToken = this.oauthService.getIdToken();
    if (idToken) {
      // const decodedToken = this.oauthService.tokenHelper.decodeToken(idToken);
      localStorage.setItem('idToken', JSON.stringify(idToken));
      // console.log('idToken', idToken);
    }
  }
}

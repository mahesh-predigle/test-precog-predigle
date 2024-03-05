import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dummy-app';
  param1: any;
  constructor(private oauthService: OAuthService) {}
  
  ngOnInit(): void {
    this.handleCallback();
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
      console.log('idToken', idToken);
    }
  }
}

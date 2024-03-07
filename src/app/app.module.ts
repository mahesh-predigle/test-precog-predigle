import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DummyComponent } from './dummy/dummy.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    private oauthService: OAuthService 
    ){
    this.configureOAuth();
  }
  
private configureOAuth() {
  this.oauthService.configure({
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,// for not checking exact above url in given
    redirectUri: window.location.origin,// redirect after logged in to google to my application
    clientId:
      '101289191754-ue0omn4map44ra6enrtat6kui29up7kh.apps.googleusercontent.com',
    responseType: 'token id_token',
    scope: 'openid profile email',
    showDebugInformation: true,
    // silentRefreshRedirectUri: window.location.origin,
    // useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
    // silentRefreshTimeout: 5000, // For faster testing
    // timeoutFactor: 0.25, // For faster testing
    // sessionChecksEnabled: true,
  });

  // historyCleanupOff
  // triggerAuthorizationResultEvent
    // this.oauthService.loadDiscoveryDocumentAndLogin(); 
    this.oauthService.logoutUrl = "https://www.google.com/accounts/Logout";
}
}

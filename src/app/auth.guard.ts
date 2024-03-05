import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  param: boolean = false;
  constructor(
    private oauthService: OAuthService,
    private activeRoute: ActivatedRoute,
  ){
    // this.activeRoute.queryParams.subscribe(params => {
    //   this.param = params['redirectFromAccount'];
    //   // console.log('this.param', this.param);           
    // });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const redirectFromAccount = route.queryParams['redirectFromAccount'];
      if (this.oauthService.hasValidAccessToken()) {
        return true;
      } else {
        debugger
        // if(!redirectFromAccount || redirectFromAccount !== 'true'){
        //   // if not from account.predigle.com
        //   this.redirectToAccount();
        //   return false;
        // }else{ 
          // if from account.predigle.com
          this.oauthService.loadDiscoveryDocumentAndLogin(); 
          this.oauthService.initImplicitFlow();
          return true;
        // }
      }
  }

  
  redirectToAccount(): void {
    const externalUrl = 'http://localhost:5000/login?param1=http://localhost:4200';
    window.location.href = externalUrl;
  }
  
}

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
  ) {
    // this.activeRoute.queryParams.subscribe(params => {
    //   this.param = params['redirectFromAccount'];
    //   // console.log('this.param', this.param);           
    // });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const redirectFromAccount = route.queryParams['redirectFromAccount'];
    // this.oauthService.loadDiscoveryDocumentAndLogin();
    // this.oauthService.initImplicitFlow()
    const isReloaded = localStorage.getItem('isReloaded') ? JSON.parse(localStorage.getItem('isReloaded')!) : false;
      if(isReloaded){
        this.redirectToAccount();
        localStorage.removeItem('isReloaded');
        return false;
      }
    localStorage.setItem('isReloaded', JSON.stringify(true));
    if (this.oauthService.hasValidAccessToken()) {
      return true;
    } else {
      // this
      //   .oauthService
      //   .silentRefresh()
      //   .then(info => console.debug('refresh ok', info))
      //   .catch(err => console.error('refresh error', err));
      if (!redirectFromAccount || redirectFromAccount !== 'true') {
        // if not from account.predigle.com
        this.redirectToAccount();
        return false;
      }
      else {
        this.oauthService.loadDiscoveryDocumentAndLogin();
        // this.oauthService.initImplicitFlow();
        // if from account.predigle.com
        return true;
      }
    }
  }


  redirectToAccount(): void {
    // this.oauthService.logOut();
    const externalUrl = 'http://localhost:5000/login?param1=http://localhost:4200';
    window.location.href = externalUrl;
  }

}

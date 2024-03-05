import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  idToken: any;
  message: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private _http: HttpClient,
    private oauthService: OAuthService
     ) {
      this.activeRoute.fragment.subscribe((fragment:any)  => {
        // debugger
        // this.param1 = params['param1'];
        const params = new URLSearchParams(fragment);
      this.idToken = params.get('id_token');
      // console.log('id_token:', this.idToken);
             
      });
    }
    //precog.predigle.com
  // logout(): void {
  //   const externalUrl = 'http://localhost:5000?param=test';
  //   window.location.href = externalUrl;
  // }
  
  handleClick(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.idToken}`,
    });
    this._http.get<any>('http://localhost:8000/bot', {
      headers
    }).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res;
      },
      error: (err) => {
        console.log(err);
        this.message = err?.message ?err?.message: 'Error';
      }
    })
  }

  handleLogOut(): void {
    this.oauthService.logOut();
    // Optional: Redirect to a logout component
    const externalUrl = 'http://localhost:5000/login?param1=http://localhost:4200';
    window.location.href = externalUrl;
  }
}

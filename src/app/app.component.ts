import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = '';
  cleams: any;

  constructor(private readonly oauthService: OAuthService) {}

  ngOnInit() {
    this.cleams = <any>this.oauthService.getIdentityClaims();
    this.title = this.cleams.name;
  }

  logout() {
    this.oauthService.logOut();
  }
}

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, AuthConfig } from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';
import { authConfig, OAuthModuleConfig } from './auth.config';

@NgModule({
  imports: [HttpClientModule, OAuthModule.forRoot()],
  providers: [
    AuthService,
    { provide: AuthConfig, useValue: authConfig },
    OAuthModuleConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: (authConfigService: AuthService) => () =>authConfigService.initAuth(),
      deps: [AuthService],
      multi: true,
    },
  ],
})
export class AuthModule {
}

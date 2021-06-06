import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: environment.keycloak.issuer,

  // URL of the SPA to redirect the user to after login
  redirectUri: environment.keycloak.redirectUri,

  // The SPA's id.
  // The SPA is registerd with this id at the auth-serverß
  clientId: environment.keycloak.clientId,

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC.
  scope: 'openid profile email',

  // Remove the requirement of using Https to simplify the demo
  // THIS SHOULD NOT BE USED IN PRODUCTION
  // USE A CERTIFICATE FOR YOUR IDP
  // IN PRODUCTION
  requireHttps: false,

  // at_hash is not present in JWT token
  showDebugInformation: true,
  disableAtHashCheck: true,
};

export class OAuthModuleConfig {
  resourceServer: OAuthResourceServerConfig = {
    sendAccessToken: false,
  };
}

export class OAuthResourceServerConfig {
  /**
   * Urls for which calls should be intercepted.
   * If there is an ResourceServerErrorHandler registered, it is used for them.
   * If sendAccessToken is set to true, the access_token is send to them too.
   */
  allowedUrls?: Array<string>;
  sendAccessToken = true;
  customUrlValidation?: (url: string) => boolean;
}

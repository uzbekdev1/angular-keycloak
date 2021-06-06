export const environment = {
  production: true,
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://178.33.123.109:8080/auth/realms/2test',

    // URL of the SPA to redirect the user to after login
    redirectUri: 'http://178.33.123.109:4200/',

    // The SPA's id.
    // The SPA is registerd with this id at the auth-serverß
    clientId: 'ui',
  },
};

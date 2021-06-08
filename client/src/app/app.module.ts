import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://keycloak.westeurope.azurecontainer.io:8080/auth',
        clientId: 'ui',
        realm: "2Test"
      }, initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true
      },
      loadUserProfileAtStartUp: true,
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, KeycloakAngularModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

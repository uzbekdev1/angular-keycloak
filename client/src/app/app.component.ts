import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title?: string;
  claims: any;

  constructor(private readonly keycloak: KeycloakService) { }

  ngOnInit() {

    let instance = this.keycloak.getKeycloakInstance();
    this.claims = instance.profile;
    this.title = `${instance.profile?.lastName} ${instance.profile?.firstName}`;

    this.callApi();
    this.callGrpc();
  }


  callApi() {

    let url = 'http://localhost:4201/api/identity/info';
    let instance = this.keycloak.getKeycloakInstance();
    let xhr = new XMLHttpRequest();

    console.log('Token ', instance.token);

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + instance.token);
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          alert('API -> Success');
        } else {
          alert('API -> Forbidden');
        }
      }
    }
    xhr.send();

  }

  callGrpc() {

    let url = 'http://localhost:4201/greet.Greeter/SayHello';
    let instance = this.keycloak.getKeycloakInstance();
    let xhr = new XMLHttpRequest();

    console.log('Token ', instance.token);

    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/grpc-web-text");
    xhr.setRequestHeader('Authorization', 'Bearer ' + instance.token);
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          alert('Grpc -> Success');
        } else {
          alert('Grpc -> Forbidden');
        }
      }
    }
    xhr.send("AAAAAAYKBHdlZXI=");

  }

  logout() {
    this.keycloak.logout();
  }

}

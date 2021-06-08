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

    this.loadData();
  }


  loadData() {

    let url = 'http://localhost:4201/api/identity/info';
    let instance = this.keycloak.getKeycloakInstance();
    let req = new XMLHttpRequest();

    console.log('Token ', instance.token);

    req.open('GET', url, true);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Authorization', 'Bearer ' + instance.token);
    req.onreadystatechange = () => {
      if (req.readyState == 4) {
        if (req.status == 200) {
          alert('Success');
        } else {
          alert('Forbidden');
        }
      }
    }
    req.send();

  }

  logout() {
    this.keycloak.logout();
  }

}

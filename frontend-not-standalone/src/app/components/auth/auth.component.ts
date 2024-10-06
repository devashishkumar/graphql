import { Component, OnInit } from '@angular/core';
import { APPLICATION_CONSTANTS } from '../../constants/app.constants';
import { LOGIN_KEY, StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  constructor(private storageServiceObj: StorageService, private router: Router) {}
  user = {
    email: '',
    password: '',
  };
  isSignup = true;

  ngOnInit() {
    console.log(this.storageServiceObj);
  }

  switchSigninSignup() {
    this.isSignup = !this.isSignup;
  }

  signup() {
    let request = {
      query: `
      mutation {
      createUser(userInput: {email: "${this.user.email}", password: "${this.user.password}"}) {
      _id
      email
      }
      }
      `,
    };
    if (!this.isSignup) {
      request = {
        query: `
        query {
        login(email: "${this.user.email}", password: "${this.user.password}") {
        userId
        token
        tokenExpiration
        }
        }
        `,
      };
    }
    fetch(APPLICATION_CONSTANTS.SERVICE_URL, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then((resBody) => {
        console.log(resBody);
        if (!this.isSignup) {
          if (resBody && resBody.data && resBody.data.login) {
            const { userId, token, tokenExpiration } = resBody.data.login;
            console.log(userId, token, tokenExpiration);
            this.storageServiceObj.setData(
              LOGIN_KEY,
              JSON.stringify(resBody.data.login)
            );
            this.router.navigate(['/home']);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

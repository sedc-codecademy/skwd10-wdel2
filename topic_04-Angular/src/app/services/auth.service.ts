import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  registerUser(email: string, password: string) {
    return this.http
      .post(
        `${environment.baseUrl}/auth/register`,
        { email, password },
        httpOptions
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  loginUser(email: string, password: string) {
    return this.http
      .post(
        `${environment.baseUrl}/auth/login`,
        {
          email,
          password,
        },
        httpOptions
      )
      .subscribe({
        next: (response: any) => {
          this.tokenStorage.saveToken(response.refreshToken);
          this.router.navigate(['todos']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  logoutUser(id: string) {}
}

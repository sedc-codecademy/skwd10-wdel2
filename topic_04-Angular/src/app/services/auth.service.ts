import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  registerUser(email: string, password: string) {}

  loginUser(email: string, password: string) {}

  logoutUser(id: string) {}
}

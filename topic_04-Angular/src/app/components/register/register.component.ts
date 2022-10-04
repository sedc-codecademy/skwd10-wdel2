import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm: NgForm;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  // ngAfterViewInit(): void {
  //   console.log(this.registerForm);
  // }

  onSubmitRegister() {
    const { email, password } = this.registerForm.value;
    this.authService.registerUser(email, password);
  }
}

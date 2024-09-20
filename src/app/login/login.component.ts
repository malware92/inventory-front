import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login({
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
      }).subscribe( ( {token} ) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
      }, (error) => {
        console.error('Error al iniciar sesión:', error);  
      } )
    }
  }
}

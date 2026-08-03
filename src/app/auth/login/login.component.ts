import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/input/input.component";
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private autheService = inject(Auth)
  private router = inject(Router)
  private tokenService = inject(TokenService)

  loginForm: FormGroup;
  isHiden: boolean = true;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      u_mob_num: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      u_pswd: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      // confirmPassword: [this.apiData?.confirmPassword || "", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    },
      // {
      //   validators: this.passwordMatchValidator
      // }
    );
  }

  handlePasswordVisibility() {
    this.isHiden = !this.isHiden;
  }

  // passwordMatchValidator(
  //   control: AbstractControl
  // ): ValidationErrors | null {
  //   const password = control.get('password')?.value;
  //   const confirmPassword = control.get('confirmPassword')?.value;
  //   return password === confirmPassword
  //     ? null
  //     : { passwordMismatch: true };
  // }


  get u_mob_numController() {
    return this.loginForm.get('u_mob_num') as FormControl;
  }

  get u_pswdController() {
    return this.loginForm.get('u_pswd') as FormControl;
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log(this.loginForm.value);
    this.autheService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        alert('Login successful!');
        // Handle successful login, e.g., store token, navigate to dashboard, etc.
        this.tokenService.setToken(response.token);
        this.router.navigate(['/layout/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert(error.error.message || 'Login failed. Please try again.');
      }
    });
  }
}

import { Component, HostListener, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/input/input.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [InputComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isHiden: boolean = true;
  isConfirmHiden: boolean = true;
  isSaved: boolean = false;
  registerForm: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.registerForm = this.fb.group({
      u_name: [''],
      u_mob_num: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      u_pswd: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    },

      {
        validators: this.passwordMatchValidator
      });
  }

  ngOnInit(): void { }

  passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('u_pswd')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }

  get u_nameController() {
    return this.registerForm.get('u_name') as FormControl;
  }

  get u_mob_numController() {
    return this.registerForm.get('u_mob_num') as FormControl;
  }

  get u_pswdController() {
    return this.registerForm.get('u_pswd') as FormControl;
  }

  get confirmPasswordController() {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  handlePasswordVisibility() {
    this.isHiden = !this.isHiden;
  }
  handleConfirmPasswordVisibility() {
    this.isConfirmHiden = !this.isConfirmHiden;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    }
    console.log(this.registerForm.value);
    this.isSaved = true;
  }

  onDeactivate() {
    if (this.registerForm.dirty && !this.isSaved) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnload(event: BeforeUnloadEvent) {
    if (this.registerForm.dirty) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

}

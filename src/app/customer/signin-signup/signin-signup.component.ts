import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../core/model/object-model';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.scss',
})
export class SigninSignupComponent {
  regForm: boolean = false;
  signUpForm!: FormGroup;
  signInForm!: FormGroup;
  signUpSubmitted: boolean = false;
  href!: string;
  user_data: any;
  user_dto!: User;
  user_reg_data: any;
  signInFormValue: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginSignupService
  ) {}
  ngOnInit() {
    this.href = this.router?.url;
    if (this.href === '/sign-up') {
      this.regForm = true;
    } else if (this.href === '/sign-in') {
      this.regForm = true;
    }
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      aggretc: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  get rf() {
    return this.signUpForm.controls;
  }

  onSubmitSignUp() {
    debugger;
    console.log(this.signUpForm.value);

    this.signUpSubmitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.user_reg_data = this.signUpForm.value;
    this.user_dto = {
      aboutYou: this.user_reg_data?.aboutYou,
      age: this.user_reg_data?.age,
      aggretc: this.user_reg_data?.aggretc,
      dob: this.user_reg_data?.dob,
      email: this.user_reg_data?.email,
      gender: this.user_reg_data?.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data?.addLine1,
        addLine2: this.user_reg_data?.addLine2,
        city: this.user_reg_data?.city,
        state: this.user_reg_data?.state,
        zipcode: this.user_reg_data?.zipCode,
      },
      language: this.user_reg_data?.language,
      mobNumber: this.user_reg_data?.mobNumber,
      name: this.user_reg_data?.name,
      password: this.user_reg_data?.password,
      uploadPhoto: this.user_reg_data?.uploadPhoto,
      desc: this.user_reg_data?.desc,
      role: this.user_reg_data?.role,
    };
    this.loginService.userRegister(this.user_dto).subscribe((data) => {
      alert('userRegister');
      this.router.navigateByUrl('/sign-in');
    });
  }

  onSubmitLogin() {
    this.loginService
      .authLogin(
        this.signInFormValue?.userEmail,
        this.signInFormValue?.userPassword
      )
      .subscribe(
        (data) => {
          this.user_data = data;
          if (this.user_data.length == 1) {
            if (this.user_data[0].role == 'seller') {
              sessionStorage.setItem('user_session_id', this.user_data[0].id);
              sessionStorage.setItem('role', this.user_data[0].role);
              this.router.navigateByUrl('/seller-dashboard');
            } else if (this.user_data[0].role == 'buyer') {
              sessionStorage.setItem('user_session_id', this.user_data[0].id);
              sessionStorage.setItem('role', this.user_data[0].role);
              this.router.navigateByUrl('/buyer-dashboard');
            } else {
              alert('Invalid Credentials');
            }
          } else {
            alert('Invalid');
          }
          console.log(this.user_data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

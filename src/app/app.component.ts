import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordIncludeName, MustMatch, CustomValidators } from './helpers/Password-validator';
import { User } from './types/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  signUpForm: FormGroup;
  submitted: boolean = false;
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  SERVER_URL = 'https://demo-api.now.sh/users';
  title = 'Fedex-signUp-Form';
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators]],
      lastName: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email,
        CustomValidators.patternValidator(this.emailRegEx, {
          missingDomain: true
        })
      ]],
      password: [
        '',
        [
          Validators.required,
          CustomValidators.patternValidator(/[A-Z]/, {
            containUpperCase: true
          }),
          CustomValidators.patternValidator(/[a-z]/, {
            containLowerCase: true
          }),
          Validators.minLength(8),
        ]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: [
        passwordIncludeName('firstName', 'lastName', 'password'),
        MustMatch('password', 'confirmPassword'),
      ]
    });
  }

  onSubmitForm(user: Partial<User>): Observable<User> { // type is Partial user as we don't need to POST all the user object;
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }

    const { firstName, lastName, email } = user; // Destructing user properties for POST request.

    const formData = new FormData();
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email:', email)

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.httpClient
      .post<User>(this.SERVER_URL, formData, options)
      .subscribe(
        () => alert('Form has been submitted '),
        (err) => console.log(err)
      );
    this.signUpForm.reset();

  }
}

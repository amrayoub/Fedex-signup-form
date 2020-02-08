import { TestBed, async, ComponentFixture, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule, AbstractControl } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from './types/user.interface';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents(); // compile templates and CSS
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    fixture.detectChanges()

  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
    expect(app.title).toEqual('Fedex-signUp-Form')
  });


  it(`should have as title 'Fedex-signUp-Form'`, () => {

    expect(app.title).toEqual('Fedex-signUp-Form');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.card-header').textContent).toContain('Fedex-signUp-Form');
  });

  it('should be invalid when form is empty', () => {
    app.signUpForm.controls.firstName.setValue('');
    app.signUpForm.controls.lastName.setValue('');
    app.signUpForm.controls.email.setValue('');
    app.signUpForm.controls.password.setValue('');
    app.signUpForm.controls.confirmPassword.setValue('');
    expect(app.signUpForm.valid).toBeFalsy();
  });

  describe('validateName', () => {
    let firstname: AbstractControl;
    let lastname: AbstractControl;

    beforeEach(() => {
      firstname = app.signUpForm.controls.firstName;
      lastname = app.signUpForm.controls.lastName;
    })

    it('should require firstname field', () => {
      expect(firstname.valid).toBeFalsy();

      firstname.setValue('');
      expect(firstname.hasError('required')).toBeTruthy();
    });

    it('should require lasttname field', () => {
      expect(lastname.valid).toBeFalsy();

      lastname.setValue('');
      expect(lastname.hasError('required')).toBeTruthy();
    });
  });

  describe('validateEmail', () => {
    let email: AbstractControl
    beforeEach(() => {
      email = app.signUpForm.controls.email;
    })
    it('should require email field', () => {
      expect(email.valid).toBeFalsy();

      email.setValue('');
      expect(email.hasError('required')).toBeTruthy();
    });

    it('should validate email field', () => {
      email.setValue('employe@');
      expect(email.hasError('email')).toBeTruthy();
    });

    it('should validate domain ', () => {
      email.setValue('employe@fedex');
      expect(email.hasError('missingDomain')).toBeTruthy();
    });
  });

  describe('validatePassword', () => {
    let password: AbstractControl
    let firstname: AbstractControl;
    let lastname: AbstractControl;
    let confirmPassword: AbstractControl;

    beforeEach(() => {
      password = app.signUpForm.controls.password;
      firstname = app.signUpForm.controls.firstName
      lastname = app.signUpForm.controls.lastName
      confirmPassword = app.signUpForm.controls.confirmPassword
    });

    it('should require password field', () => {
      expect(password.valid).toBeFalsy();

      password.setValue('');
      expect(password.hasError('required')).toBeTruthy();
    });

    it('should require the password to be at least 8 digits', () => {
      password.setValue('1234567');
      expect(password.hasError('minlength')).toBeTruthy();
    });

    it('should require the password to contain at least one capital letter', () => {
      password.setValue('1234abc');
      expect(password.hasError('containUpperCase')).toBeTruthy();
    });

    it('should require the password to contain at least one small letter', () => {
      password.setValue('1234ABC');
      expect(password.hasError('containLowerCase')).toBeTruthy();
    });


    it('should require the password to be equal to confirm password field', () => {
      password.setValue('Aa123456');
      confirmPassword.setValue('Aa123456');

      expect(password.value).toEqual(confirmPassword.value);
    });



  });

  describe('submitForm', () => {
    let user: Partial<User>;

    beforeEach(() => {
      user = {
        firstName: 'Noa',
        lastName: 'Ali',
        email: 'NoaAli@gmail.com'
      }
    });

    it('should set submitted to true', () => {
      app.onSubmitForm(user);
      expect(app.submitted).toBeTruthy();

    });
  })

});
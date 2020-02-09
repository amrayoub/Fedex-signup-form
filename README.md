# FedexSignUpForm

<img src="https://github.com/amrayoub/Fedex-signup-form/blob/master/1.png?raw=true" />

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.25.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


### User shape:
```typescript
interface User {
  firstName: string; // required
  lastName: string; // required
  email: string; // required, must be valid email format
  password: string; // required, value must be equal to confirm password and not include firstname || lastname.
  confirmPassword: string; // required, value must be equal to password.
}
```


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

<img src="https://github.com/amrayoub/Fedex-signup-form/blob/master/2.png?raw=true" />


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

export interface User {
  firstName: string; // required
  lastName: string; // required
  email: string; // required, must be valid email format
  password: string; // required, value must be equal to confirm password and not include firstname || lastname.
  confirmPassword: string; // required, value must be equal to password.
}
import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }
}


// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {

    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

// custom validator to check if password contain first or last name
export function passwordIncludeName(firstName: string, lastName: string, password: string) {
  return (formGroup: FormGroup) => {
    const fName = formGroup.controls[firstName]
    const lName = formGroup.controls[lastName]
    const passwordContorl = formGroup.controls[password]

    if (passwordContorl.errors && !passwordContorl.errors.passwordIncludeName) {
      // return if another validator has already found an error on the passwordIncludeName
      return;
    }
    const included = passwordContorl.value.includes(fName.value) || passwordContorl.value.includes(lName.value);

    if (included) {
      passwordContorl.setErrors({ passwordIncludeName: true })
    }
    else {
      passwordContorl.setErrors(null);
    }

  }
}
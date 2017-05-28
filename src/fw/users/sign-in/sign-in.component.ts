import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserApi } from '../user-api';

@Component({
  selector: 'fw-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  formError: string;
  submitting = false;

  constructor(private userApi: UserApi, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(signInForm: NgForm) {
    if (signInForm.valid) {
      this.submitting = true;
      this.formError = null;

      this.userApi.signIn(signInForm.value.username, signInForm.value.password, signInForm.value.rememberme)
        .subscribe(data => {
          this.router.navigate(['/authenticated']);
        },
        err => {
          this.submitting = false;
          this.formError = err;
        }
        );
    }
  }

}

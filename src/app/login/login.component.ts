import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  title = 'Trade-x';
  lSubmit = false;
  loginForm: FormGroup;
  badCredentials = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
       this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        }); 
  }

  get lForm() { return this.loginForm.controls; }

  onSubmit() {
        this.lSubmit = true;
		if (this.loginForm.invalid) {
            return;
        }
        if (this.loginForm.controls.email.value == "demoapi@gmail.com" && this.loginForm.controls.password.value == "password"){
        	this.router.navigateByUrl('/home');
        } else {
        	this.badCredentials = true;
        }
    }
}

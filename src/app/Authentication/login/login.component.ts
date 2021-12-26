import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user'
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  fieldTextType = false;
  loading = false;
  loggedInUser: any;  

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const data = this.loginForm.getRawValue();
    if (!this.loginForm.valid || !this.loginForm.dirty) {
      Object.keys(this.loginForm.controls).map(r => {
        this.loginForm.controls[r].markAsDirty();
        this.loginForm.controls[r].markAsTouched();
        this.loginForm.controls[r].updateValueAndValidity();
      })
    }

    if (!this.loginForm.controls) {
      return;
    } else {
      const userName = this.loginForm.controls.userName.value;
      const password = this.loginForm.controls.password.value;
      const data = JSON.parse(localStorage.getItem("registerUser") as any) || [];
      const user = data.filter((result: User) => result.userName === userName && result.password === password)
      if(user.length > 0 ) {
        this.loading = false;
        user[0].isLoggedIn = true;
        localStorage.setItem('registerUser', JSON.stringify(data));
        sessionStorage.setItem('loggedInUserDetail', JSON.stringify(user));
        this.router.navigate(['/chat-box']);
      } else {
        this.loading = false;
        alert("Invalid username or password");
      }      
    }
  }

}

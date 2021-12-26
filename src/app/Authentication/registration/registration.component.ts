import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  userList: Array<User> = [];
  loading = false;
  submitted = false;
  fieldTextType = false;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (!this.registerForm.valid || !this.registerForm.dirty) {
      Object.keys(this.registerForm.controls).map(r => {
        this.registerForm.controls[r].markAsDirty();
        this.registerForm.controls[r].markAsTouched();
        this.registerForm.controls[r].updateValueAndValidity();
      })
    }
    if (!this.registerForm.valid) {
      this.loading = false;
      return;
    } else {
        let userData = new User();
        this.userList = JSON.parse(localStorage.getItem('registerUser')as any) || [];
        const userIdList = this.userList.map((x) => x.userId) as Array<number>;
        var max = userIdList.reduce(function(a, b) {
          return Math.max(a, b);
        }, 0);
        userData.userId = max + 1;
        userData.firstName = this.registerForm.controls.firstName.value;
        userData.lastName =  this.registerForm.controls.lastName.value;
        userData.userName = this.registerForm.controls.userName.value;
        userData.password = this.registerForm.controls.password.value;
        userData.isLoggedIn = false;
        this.userList.push(userData);
        this.loading = false;
        localStorage.setItem('registerUser', JSON.stringify(this.userList));
        this.router.navigate(['/login']);

            // localStorage.setItem('registerUser', JSON.stringify([
            //   {
            //   userId: 1,
            //   firstname: 'Priyanka',
            //   lastname: 'Patel',
            //   username: 'Priyanka',
            //   password: '123456',
            //   isLoggedIn: false
            //   },
            //   {
            //     userId: 2,
            //     firstname: 'Ravina',
            //     lastname: 'Patel',
            //     username: 'Ravina',
            //     password: '123456',
            //     isLoggedIn: false
            //   },
            //   {
            //     userId: 3,
            //     firstname: 'Rajni',
            //     lastname: 'Shah',
            //     username: 'Rajni',
            //     password: '123456',
            //     isLoggedIn: false
            //   },
            //   {
            //     userId: 4,
            //     firstname: 'Harvi',
            //     lastname: 'Bhatt',
            //     username: 'Harvi',
            //     password: '123456',
            //     isLoggedIn: false
            //   }
            // ]));
           
            // this.router.navigate(['/authentication/login']);
      // })
    }
  }

}

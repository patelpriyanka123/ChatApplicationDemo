import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: any[] = [];  
  counter: number = 1;

  constructor(private user: UserService ) { }

  ngOnInit(): void {
    this.getUserList();
    window.addEventListener('storage', () => {
      this.getUserList();
    });
  }

  onUserClick(user: any) {
    this.user.usernameSource.next(user);
  }

  getUserList() {
    const data = JSON.parse(localStorage.getItem("registerUser") as any);
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUserDetail") as any);
    this.userList = data.filter((result:any) => result.username !== loggedInUser[0].username); 
  }

}

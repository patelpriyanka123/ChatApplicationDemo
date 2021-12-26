import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatapplication';
  ngOnInit(): void {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUserDetail") as any);
    window.addEventListener('unload', function(event) {
      const data = JSON.parse(localStorage.getItem("registerUser") as any) ;
      const user = data.filter((result: any) => result.username === loggedInUser[0].username && result.password === loggedInUser[0].password);
      if(user.length > 0 ) {
        user[0].isLoggedIn = false;
        localStorage.setItem('registerUser', JSON.stringify(data));
      }
    });

  }
}

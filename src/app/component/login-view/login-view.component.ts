import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginButtonClicked(email, psd){
    this.authService.login(email, psd).subscribe((res: HttpResponse<any>) => {
      if(res.status === 200){
        this.router.navigate(['/lists'])
      }
    })
  }
  
}

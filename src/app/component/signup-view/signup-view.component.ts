import { HttpResponse } from '@angular/common/http';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.scss']
})
export class SignupViewComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignupButtonClicked(email, psd){
    this.authService.signup(email, psd).subscribe((res: HttpResponse<any>) => {
      this.router.navigate(['/lists'])
    })
  }
}

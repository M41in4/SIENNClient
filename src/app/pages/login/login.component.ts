import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/index';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', ]
})
export class LoginComponent implements OnInit {
  
  private user: any = {};
  private error: string;

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
      this.authenticationService.login(this.user.username, this.user.password)
      .subscribe(result => {
        if (result == true) {
          this.router.navigate(['/home']);
        } else {
          this.toastr.error('Something went wrong.');
        }
      }, error => {
        this.toastr.error(error, 'Error');
      }); 
  }
}

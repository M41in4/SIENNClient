import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/index';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', ]
})
export class LoginComponent implements OnInit {
  user: any = {};
  error: string;

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
        if (result) {
          this.router.navigate(['/home']);
        } else {
          this.toastr.error('Something went wrong.', 'Error');
        }
      }, error => {
        this.toastr.error(error, 'Error');
      });
  }
}

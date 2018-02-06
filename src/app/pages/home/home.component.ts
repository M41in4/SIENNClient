import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, AuthenticationService } from '../../core/index';
import { Product } from '../../model/index';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: string;
  products: Product[];

  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService, 
    private router: Router,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).username;
    this.getProducts();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe((response: Product[]) => {
        this.products = response;
        this.toastr.success('Products are loaded successfully.', 'Success');
      }, error => {
        this.toastr.error(error, 'Error');
      })
  }
}

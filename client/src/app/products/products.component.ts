import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  product = [];
  newProduct: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.newProduct = {title: "", price: "", image: ""}
    this.getProducts()

  }

  getProducts(){
    console.log("Trying to retrieve products!")
    let observable = this._httpService.getProducts()
    observable.subscribe(data => {
      console.log("Got our data!", data)
      this.products = data['data'];
      console.log("Got our products!", this.products)
    })
  }

  editOnClick(product){
    console.log("Product we need to edit", product._id);
    console.log("Product name", product.title);
    // Load Edit component
  }

  onDelete(product_id){
    let observable = this._httpService.deleteProduct(product_id);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      this.getProducts();
    })
  }

}

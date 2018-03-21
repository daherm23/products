import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editProduct = {title: '', price: '', image: ''};
  product_id = "";
  product = []; 
  error = "";

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

    ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.product_id = params['id'];
      
      let observable = this._httpService.getProduct(this.product_id)
      observable.subscribe(data => {
        //this.product = data['data'];
        console.log("Got the product!", data['data']);
        this.editProduct = data['data'];
        console.log("PRODUCT", this.editProduct)
      })

    })
  }
  onEdit(editProduct){
    console.log("Edit the product", editProduct._id)
    let observable = this._httpService.editProduct(editProduct);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      this.product = data["data"]
      
      if (data['message'] == "Error") {
        console.log("ERROR!!!");
        this.error = data['error']
        console.log("ERROR IS!!!", this.error);
      }
      else {
        this.goHome();
      }
    })
  }
  getProduct(id){
    console.log("Trying to get product", id)
    this.product = [];
    let observable = this._httpService.getProduct(id)
    observable.subscribe(data => {
      //this.product = data['data'];
      console.log("Got the product!!", data['data']);
      return data['data'];
    })
  }
  goHome() {
    this._router.navigate(['/products']);
  }

}

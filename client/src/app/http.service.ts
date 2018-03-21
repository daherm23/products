import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }


getProducts(){
  return this._http.get('/products');
}

getProduct(product_id){
  console.log('ID is', product_id);
  // let tempObservable = this._http.get('/tasks/5a84f4c3d7dee2b8012d96ae');
  // tempObservable.subscribe(data => console.log("Got the task!", data));
  return this._http.get('/products/'+product_id);
}
addProduct(newproduct){
  console.log("sending request to backend to add new", newproduct)
  return this._http.post('/products/new', newproduct);
}

editProduct(editProduct){
  console.log('request to edit', editProduct._id);
  return this._http.put('/products/'+editProduct._id, editProduct);
}

deleteProduct(product_id){
  console.log('request to delete');
  return this._http.delete('/products/'+product_id);
}



}
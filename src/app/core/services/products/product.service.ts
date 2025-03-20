import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { inv } from '../../../shared/invauroment/inv';


@Injectable({
  providedIn: 'root'
})
export class ProductService {




constructor( private http:HttpClient) { }

private $product!:Observable<any> | null



getAllProductsHome( ):Observable <any>
{

  if (!this.$product) {

  this.$product =  this.http.get(`${inv.baseurl}/api/v1/products`).pipe(
    shareReplay(1)
  )
    
  }

  return this.$product
}




getAllProducts(price:number = 100 ,page:number ):Observable <any>
{

  return this.http.get(`${inv.baseurl}/api/v1/products?sort=price&price[gte]=${price}&limit=10&page=${page}`)
}

getSpecProduct(PID:string | null):Observable <any>
{

  
  return this.http.get(`${inv.baseurl}/api/v1/products/${PID}`)
}


}

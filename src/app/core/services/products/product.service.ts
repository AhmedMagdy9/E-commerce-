import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { filter, map, Observable, ReplaySubject, shareReplay } from 'rxjs';
import { inv } from '../../../shared/invauroment/inv';
import { Products } from '../../../shared/interfaces/products';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
private $product!:Observable<any> | null


constructor( private http:HttpClient) { }



getProductsCatapi(catid: string): Observable<any[]> { 
  return this.http.get<{ data?: any[] }>(`${inv.baseurl}/api/v1/products`).pipe(
    map((res) =>  Array.isArray(res.data) ? res.data.filter((product) => product.category?._id === catid) : [])
  );
}

getAllProductsHome( ):Observable <any>
{

  if (!this.$product) {

  this.$product =  this.http.get(`${inv.baseurl}/api/v1/products?limit=56`).pipe(
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

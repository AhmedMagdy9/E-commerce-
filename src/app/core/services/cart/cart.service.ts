
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, map, Observable } from 'rxjs';
import { inv } from '../../../shared/invauroment/inv';

@Injectable({
  providedIn: 'root'
})
export class CartService  {

  


  



constructor( private http:HttpClient) { 
}



  addTOCartapi(pid:string|undefined):Observable<any>
  {
  

    
    return  this.http.post(`${inv.baseurl}/api/v1/cart` , {'productId': pid} )

  }

  getAllCartapiCount():Observable<any>
  {

 
    return  this.http.get(`${inv.baseurl}/api/v1/cart` ).pipe(
      map((res:any)=>{return res.numOfCartItems}))
  }
  getAllCartapi():Observable<any>
  {

 
    return  this.http.get(`${inv.baseurl}/api/v1/cart` )
  }

  updateProductApi(pid:string , count:Number):Observable<any>{

    return this.http.put(`${inv.baseurl}/api/v1/cart/${pid}` , {'count' : count} )
  }

  removeProductApi(pid:string):Observable<any>
  {

    return  this.http.delete(`${inv.baseurl}/api/v1/cart/${pid}` )

  }

  clearCart():Observable<any>
  {

    return this.http.delete(`${inv.baseurl}/api/v1/cart` )

  }

}

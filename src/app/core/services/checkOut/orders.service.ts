import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inv } from '../../../shared/invauroment/inv';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
userToken:string = localStorage.getItem('userToken')!

constructor(private http:HttpClient) { }



  checkOutApi(cartID:string , checkOutForm:object):Observable<any>
  {
    return this.http.post(`${inv.baseurl}/api/v1/orders/checkout-session/${cartID}?url=${inv.host}` , {shippingAddress:checkOutForm} , {
      headers : {token : this.userToken}
     
    } )

  }




  cashOrderApi(cartID:string , checkOutForm:object):Observable<any>
  {
    return this.http.post(`${inv.baseurl}/api/v1/orders/${cartID}` , {shippingAddress:checkOutForm} , {
      headers : {token : this.userToken}
     
    } )
  }


  getuserOrders(userid:string):Observable<any>
  {

    return this.http.get(`${inv.baseurl}/api/v1/orders/user/${userid}`)
  }
}
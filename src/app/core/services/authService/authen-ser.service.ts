import { PlatformService } from './../platform/platform.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { inv } from '../../../shared/invauroment/inv';



@Injectable({
  providedIn: 'root'
})
export class AuthenSerService {

  personData:BehaviorSubject<any> = new BehaviorSubject(null)

  private platformService = inject(PlatformService)



  
  constructor(private http:HttpClient){

    if (this.platformService.cheekplatform() ) {
      this.saveToken()
     
   }
  }


  sendRegAPI(userData:object ):Observable<any>
  {
   return this.http.post(`${inv.baseurl}/api/v1/auth/signup` , userData)
  }

  
  sendLoginAPI(userData:object ):Observable<any>
  {
   return this.http.post(`${inv.baseurl}/api/v1/auth/signin` , userData)
  }

  sendEmailApi(userEmail:string):Observable <any>
  {
   return this.http.post(`${inv.baseurl}/api/v1/auth/forgotPasswords` , { email:userEmail})
  }

  sendCodeApi(userCode:string):Observable <any>
  {
   return this.http.post(`${inv.baseurl}/api/v1/auth/verifyResetCode` , { resetCode:userCode})
  }
  
  sendNewPassApi(newPass:object):Observable <any>
  {
   return this.http.put(`${inv.baseurl}/api/v1/auth/resetPassword` , newPass)
  }

  changePassApi(updatepass:object):Observable<any>
  {
    return this.http.put(`${inv.baseurl}/api/v1/users/changeMyPassword` , updatepass)

  }



  saveToken(){

    
    if (localStorage.getItem('userToken') != null) {
      this.personData.next(jwtDecode(JSON.stringify(localStorage.getItem('userToken')))) 
      
    }
      
    

    
  
  }

}


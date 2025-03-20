import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { inv } from '../../../../shared/invauroment/inv';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http:HttpClient) { }

  private $brands!:Observable<any> | null


  getAllBrandsApi():Observable <any>
  {

    
      if (!this.$brands) {
    
      this.$brands =   this.http.get(`${inv.baseurl}/api/v1/brands`).pipe(
        shareReplay(1)
      )
        
      }
    
      return this.$brands
  }

  

  getSpecBrandsApi(brandID:string):Observable<any>
  {
    return this.http.get(`${inv.baseurl}/api/v1/brands/${brandID}`)
  }


}


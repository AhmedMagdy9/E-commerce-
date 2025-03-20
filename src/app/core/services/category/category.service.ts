import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { inv } from '../../../shared/invauroment/inv';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

   constructor(private http:HttpClient) { }
   private $categories!:Observable<any> | null
  
  
    getAllCatApi():Observable <any>
    {
  
            if (!this.$categories) {
          
            this.$categories =   this.http.get(`${inv.baseurl}/api/v1/categories`).pipe(
              shareReplay(1)
            )
              
            }
          
            return this.$categories

    }
  
    getSpecCatApi(catID:string):Observable<any>
    {
      return this.http.get(`${inv.baseurl}/api/v1/categories/${catID}/subcategories`)
    }
  
   
  
}
